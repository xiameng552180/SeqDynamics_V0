import MongoProcessor
import json
import matplotlib.pyplot as plt
import csv
difcomp1 = [1000,1001,1004,1005,1009,1012,1013,1014,1017,1019,1021,1028,1029,1032,1037]
difcomp2 = [5738,5737,1686,1711,2023,2087,2203,5727,5724,5723,3746,3507,5744,5880,5974,6217,6229,6433,6430,6434,6435,6346,6347,6432]
difcomp3 = [5992,5957,6224,1358,2222,2243,2829,2896,2993,3065,3294,4763,4400,4347,3487,5739,5741,5885,6189,6218,6428,6327,6328,6416,6424]
difcomp4 = [5732,5731,5730,3068,5612,5832,5837,5881,5950,5953,5959,5986,5990,5991,5994,6193,6192,6190,6226,6221,6220,6426,6431,6302]

connection = MongoProcessor.Processor()
authors = connection.loadCollections('mega_authors')
problems = connection.loadCollections('mega_problems')
sequences = connection.loadCollections('sequences')
submissions = connection.loadCollections('submissions')
outputCollection = connection.loadCollections('test')



with open('problems-adv2017.json') as f:
    data = json.load(f)
# filter options
# query = { "author": { "$regex": "^h" } }
# presentedFields = { "_id": 0}
# mycol.find(query, presentedFields)


    
query = {}
presentedF = {}
#db.domain.update({},{$unset: {affLink:1}},{multi: true});

# Calculate Dh of according to all the authors
authorsDif = {}
subsetSize = 300


for author in sequences.find().sort('author'):
    #print(len(author['sequence']))
    i = 0
    problemDict = {}
    while i < len(author['sequence']):
        problemID = author['sequence'][i]['problemID']
        if problemID in problemDict.keys():
            problemDict[problemID].append(author['sequence'][i]['judgeStatus'])
        else:
            problemDict[problemID] = list()
            problemDict[problemID].append(author['sequence'][i]['judgeStatus'])
        i = i + 1
    difficultyDict = {}
    i = 0
    while i < len(author['sequence']):
        problemID = author['sequence'][i]['problemID']
        difficulty = ''
        if len(problemDict[problemID]) == 1:
            if problemDict[problemID][0] == 'Accepted':
                difficulty = 1
            else:
                difficulty = 5
        else:
            counter = 0
            #print(problemDict[problemID][0])
            """
            for problem in problemDict[problemID]
            """
            if problemDict[problemID][0] == 'Accepted':
                difficulty = 1
            elif 'Accepted' in problemDict[problemID]:
                difficulty = 5
            else:
                difficulty = 10
        difficultyDict[problemID] = difficulty
        i = i + 1
    authorsDif[author['author']] = (problemDict, difficultyDict)
    #print('author ' + author['author'] + ' finished processing')
print('Finished Processing Sequences')


authorsRank = {}
for author in authors.find().sort('author'):
    if author['num_problems_solved']>500 and author['num_problems']<3000:
        authorsRank[author['author']] = 5
    elif author['num_problems_solved']>200 and author['num_problems']<500:
        authorsRank[author['author']] = 4
    elif author['num_problems_solved']>100 and author['num_problems']<200:
        authorsRank[author['author']] = 3
    elif author['num_problems_solved']>10 and author['num_problems']<100:
        authorsRank[author['author']] = 2
    elif author['num_problems_solved']<10:
        authorsRank[author['author']] = 1
print('Finished Processing Ranks')  
#print(authorsRank)

authorsData = {}
for author in authors.find().sort('author'):
    if author['author'] in authorsRank and author['author'] in authorsDif:
        authorsData[author['author']] = (authorsRank[author['author']], authorsDif[author['author']][1])

print('Finished Combining')

problemScoreRaw = {}
for author in authorsData:
    for problemID in authorsData[author][1]:
        if problemID in problemScoreRaw.keys():
            problemScoreRaw[problemID].append(authorsData[author][1][problemID])
        else:
            problemScoreRaw[problemID] = list()
            problemScoreRaw[problemID].append(authorsData[author][1][problemID])

problemScore = {}
for problem in problemScoreRaw:
    problemScore[problem] = (sum(problemScoreRaw[problem])/len(problemScoreRaw[problem]),len(problemScoreRaw[problem]))

print('Finished Computing Dh')
maxDone = 0
for problem in problemScore:
    if maxDone < problemScore[problem][1]:
        maxDone = problemScore[problem][1]
maxPS = 0
minPS = 0
for problem in problemScore:
    if maxPS < problemScore[problem][0]:
        maxPS = problemScore[problem][0]
    if minPS > problemScore[problem][0]:
        minPS = problemScore[problem][0]
#print(maxPS)

#print(maxDone)
scoreAndWeight = {}
for problem in problemScore:
    scoreAndWeight[problem] = (problemScore[problem][1]/maxDone,(problemScore[problem][0]-minPS)/(maxPS-minPS),problemScore[problem][1])

#Calculate original difficulty based on submits and pass

difficulty = {}
difficulty1 = {}
difficulty2= {}
difficulty3 = {}
minSubmit = 100000
maxSubmit = 0
for problem in scoreAndWeight:

    for x in problems.find({"problemID": int(problem)}):
        """
        print('Problem ' + str(x['problemID']) +' score: ')
        print(scoreAndWeight[str(x['problemID'])])
        print('')
        """
        if x['count_submits']> maxSubmit:
            maxSubmit = x['count_submits']
        if x['count_submits']< minSubmit:
            minSubmit = x['count_submits']
        #passSubmitRatio = 1-x['count_pass']/x['count_submits']
        #difficulty[problem] = (1 - scoreAndWeight[str(x['problemID'])][0])*passSubmitRatio + scoreAndWeight[str(x['problemID'])][0]*scoreAndWeight[str(x['problemID'])][1]
        #difficulty[problem] = scoreAndWeight[str(x['problemID'])][1]
#print(minSubmit)
#print(maxSubmit)

for problem in scoreAndWeight:
    for x in problems.find({"problemID": int(problem)}):
        """
        print('Problem ' + str(x['problemID']) +' score: ')
        print(scoreAndWeight[str(x['problemID'])])
        print('')
        """
        passSubmitRatio = 1-x['count_pass']/x['count_submits']
        """
        difficulty[problem] = x['count_submits']
        difficulty[problem] = scoreAndWeight[str(x['problemID'])][0]*scoreAndWeight[str(x['problemID'])][1]
        """
        if x['count_submits']>3000:
            ratioSubmit = 1
        else:
            ratioSubmit = x['count_submits']/3000
        #0.9*(1-ratioSubmit)+ 0.1*
        difficulty[problem] =0.5* (1-ratioSubmit) + 0.5*scoreAndWeight[str(x['problemID'])][1]
        difficulty1[problem] =0.3* (1-ratioSubmit) + 0.7*scoreAndWeight[str(x['problemID'])][1]
        difficulty2[problem] =(1-ratioSubmit)
        difficulty2[problem] =scoreAndWeight[str(x['problemID'])][1]
        difficulty3[problem] = 0.5*scoreAndWeight[str(x['problemID'])][1]
        #difficulty2[problem] = 0.5* (1-ratioSubmit) + 0.5*scoreAndWeight[str(x['problemID'])][1]





authorsRank = {}
for author in sequences.find().sort('author'):
    #print(len(author['sequence']))
    i = 0
    problemDict = {}
    while i < len(author['sequence']):
        problemID = author['sequence'][i]['problemID']
        if problemID in problemDict.keys():
            problemDict[problemID].append(author['sequence'][i]['judgeStatus'])
        else:
            problemDict[problemID] = list()
            problemDict[problemID].append(author['sequence'][i]['judgeStatus'])
        i = i + 1
    #print(problemDict)
    winningStatus = {}
    for problemID in problemDict:
        winState = 0
        if len(problemDict[problemID])== 1:
            if problemDict[problemID][0] == 'Accepted':
                winState = 1
            else:
                winState = 0
        elif len(problemDict[problemID])==2:
            if 'Accepted' in problemDict[problemID]:
                winState = 1
            else:
                winState = 0
        else:
            if (problemDict[problemID][0]) == 'Accepted' or (problemDict[problemID][1] == 'Accepted'):
                winState = 1
            elif 'Accepted' in problemDict[problemID]:
                winState = 0.5
            else:
                winState = 0
        winningStatus[problemID] = winState
        authorsRank[author['author']] = [0, winningStatus]
print("Finished Collecting Authors")
problemsRank = {}
for problem in problems.find():
    problemsRank[str(problem['problemID'])] = 0
print("Finish Collecting Problems")

for author in authorsRank:
    for problem in problemsRank:
        if str(problem) in authorsRank[author][1]:
            aWinState = authorsRank[author][1][str(problem)]
            pWinState = 0
            if aWinState == 1:
                pWinState = 0
            elif aWinState == 0:
                pWinState = 1
            elif aWinState == 0.5:
                pWinState = 0.5
            authorX = 10**((authorsRank[author][0]-problemsRank[problem])/400)
            problemX = 10**(-1*(authorsRank[author][0]-problemsRank[problem])/400)
            authorExp = (1/(1+authorX))
            problemExp = (1/(1+problemX))
            ratingConstant = 0.5
            authorsRank[author][0] = authorsRank[author][0] + ratingConstant*(aWinState - authorExp)
            if (problemsRank[problem] + ratingConstant*(pWinState - problemExp))< -6000:
                problemsRank[problem] = -6000
            else:
                problemsRank[problem] = problemsRank[problem] + ratingConstant*(pWinState - problemExp)
print("Finished Calculating")
minimumPRank = 10000
maximumPRank = -6001
index = ''
for problem in problemsRank:
    if problemsRank[problem] < minimumPRank:
        minimumPRank = problemsRank[problem]
    if problemsRank[problem] > maximumPRank and problem != '1002':
        maximumPRank = problemsRank[problem]
        index = problem
print(maximumPRank)
print(minimumPRank)
print(index)
problemsRank = {}
for problem in problemsRank:
    if problemsRank[problem] > 1:
        print(">" + problem)
    if problemsRank[problem] < 1:
        print("<" + problem)

for problem in problemsRank:
    if problem in difficulty3:
        problemsRank[problem] = 0.5*(problemsRank[problem]-minimumPRank)/(maximumPRank-minimumPRank) + difficulty3[problem]



"""
distribution = [0,0,0,0,0,0,0,0,0,0]
for problem in problemsRank:
    if (problemsRank[problem] > 0) and (problemsRank[problem] < 0.1):
        distribution[0] = distribution[0]+1
    elif (problemsRank[problem] > 0.1) and (problemsRank[problem] < 0.2):
        distribution[1] = distribution[1]+1
    elif (problemsRank[problem] > 0.2) and (problemsRank[problem] < 0.3):
        distribution[2] = distribution[2]+1
    elif (problemsRank[problem] > 0.3) and (problemsRank[problem] < 0.4):
        distribution[3] = distribution[3]+1
    elif (problemsRank[problem] > 0.4) and (problemsRank[problem] < 0.5):
        distribution[4] = distribution[4]+1
    elif (problemsRank[problem] > 0.5) and (problemsRank[problem] < 0.6):
        distribution[5] = distribution[5]+1
    elif (problemsRank[problem] > 0.6) and (problemsRank[problem] < 0.7):
        distribution[6] = distribution[6]+1
    elif (problemsRank[problem] > 0.7) and (problemsRank[problem] < 0.8):
        distribution[7] = distribution[7]+1
    elif (problemsRank[problem] > 0.8) and (problemsRank[problem] < 0.9):
        distribution[8] = distribution[8]+1
    elif (problemsRank[problem] > 0.9) and (problemsRank[problem] < 1.0):
        distribution[9] = distribution[9]+1

plt.plot(distribution)
plt.show()
plt.cla()
"""
    
print("Finished Normalizing")
authorsRankF = {}
for author in authorsRank:
    authorsRankF[author] = authorsRank[author][0]

# for plotting the graphs
"""
difficultyOut = list()
count1 = 0
count2 = 0
count3 = 0
count4 = 0
for i in range(len(difcomp1)):
    if str(difcomp1[i]) in problemsRank and (str(difcomp1[i]) in difficulty3):
        difficultyOut.append(problemsRank[str(difcomp1[i])])
        count1 = count1+1
for i in range(len(difcomp2)):
    if str(difcomp2[i]) in problemsRank and count2 < count1 and (str(difcomp2[i]) in difficulty3):
        difficultyOut.append(problemsRank[str(difcomp2[i])])
        count2 = count2+1
for i in range(len(difcomp3)):
    if str(difcomp3[i]) in problemsRank and count3 < count1 and (str(difcomp3[i]) in difficulty3):
        difficultyOut.append(problemsRank[str(difcomp3[i])])
        count3 = count3+1
for i in range(len(difcomp4)):
    if str(difcomp4[i]) in problemsRank and count4 < count1 and (str(difcomp4[i]) in difficulty3):
        difficultyOut.append(problemsRank[str(difcomp4[i])])
        count4 = count4+1

print(count1)
print(count2)
print(count3)
print(count4)
plt.axvline(x=count1)
plt.axvline(x=count1+count2)
plt.axvline(x=count1+count2+count3)
plt.plot(difficultyOut)
plt.show()
plt.cla()
"""

# for saving into database

for author in authors.find():
    if str(author['author']) in authorsRankF:
        authors.update_one({"author": author['author']}, {"$set": {"ranking": authorsRankF[str(author['author'])]}})
"""
for x in problems.find():
    if str(x['problemID']) in problemsRank:
        problems.update_one({"problemID": x['problemID']}, {"$set": {"difficulty": problemsRank[str(x['problemID'])]}})
"""
print("everything finished")


