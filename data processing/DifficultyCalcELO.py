import MongoProcessor
import json
import matplotlib.pyplot as plt
import csv

connection = MongoProcessor.Processor()
authors = connection.loadCollections('mega_authors')
problems = connection.loadCollections('mega_problems')
sequences = connection.loadCollections('sequences')
outputCollection = connection.loadCollections('rankEachMonth')
with open('problems-adv2017.json') as f:
    data = json.load(f)

authorsRank = {}
problemsRank = {}
for problem in problems.find():
    problemsRank[str(problem['problemID'])] = 0
print("Finish Collecting Problems")
previousRank = {}
for author in sequences.find():
    previousRank[author['author']] = 0
month = ['2017-01','2017-02','2017-03','2017-04','2017-05',
'2017-06','2017-07','2017-08','2017-09','2017-10','2017-11',
'2017-12','2018-01','2018-02','2018-03','2018-04','2018-05',
'2018-06','2018-07','2018-08']
authorsRankMonth = []
for m in range(len(month)):
    for author in sequences.find():
        i = 0
        problemsTM=[]
        while i < len(author['sequence']):
            timeString = author['sequence'][i]['time']
            if (month[m]) in timeString:
                problemsTM.append(author['sequence'][i])
            i = i + 1

        problemDict = {}
        i = 0
        while i < len(problemsTM):
            problemID = problemsTM[i]['problemID']
            if problemID in problemDict.keys():
                problemDict[problemID].append(problemsTM[i]['judgeStatus'])
            else:
                problemDict[problemID] = list()
                problemDict[problemID].append(problemsTM[i]['judgeStatus'])
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
            authorsRank[author['author']]= [previousRank[author['author']],winningStatus]

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
    #print("Finished Normalizing")
    authorsRankF = {}
    rankMonth = {}
    for author in authorsRank:
        authorsRankF[author] = authorsRank[author][0]
        previousRank[author] = authorsRankF[author]
    rankMonth[month[m]] = authorsRankF
    outputCollection.insert_one({'month': month[m], 'rankings': rankMonth[month[m]]})
    print(month[m] + ' done')

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
    

"""
# save author and problem ranking into mongoDB
outputCollection = connection.loadCollections('authorRank')
outputCollection.insert(authorsRankF)
outputCollection = connection.loadCollections('problemRank')
outputCollection.insert(problemsRank)
"""
"""
difficultyOut = list()
count1 = 0
count2 = 0
count3 = 0
count4 = 0
for i in range(len(difcomp1)):
    if str(difcomp1[i]) in problemsRank:
        difficultyOut.append(problemsRank[str(difcomp1[i])])
        count1 = count1+1
for i in range(len(difcomp2)):
    if str(difcomp2[i]) in problemsRank and count2 < count1:
        difficultyOut.append(problemsRank[str(difcomp2[i])])
        count2 = count2+1
for i in range(len(difcomp3)):
    if str(difcomp3[i]) in problemsRank and count3 < count1:
        difficultyOut.append(problemsRank[str(difcomp3[i])])
        count3 = count3+1
for i in range(len(difcomp4)):
    if str(difcomp4[i]) in problemsRank and count4 < count1:
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
with open('eloGraphData', mode = 'w') as myfile:
    wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
    wr.writerow(difficultyOut)

"""



"""
difficultyOut = list()

difficultyOut.append(problemsRank[str(1000)])
difficultyOut.append(problemsRank[str(1001)])
difficultyOut.append(problemsRank[str(1004)])
difficultyOut.append(problemsRank[str(1005)])
difficultyOut.append(problemsRank[str(1008)])
difficultyOut.append(problemsRank[str(1012)])
difficultyOut.append(problemsRank[str(1013)])
difficultyOut.append(problemsRank[str(1014)])
difficultyOut.append(problemsRank[str(1017)])
difficultyOut.append(problemsRank[str(1019)])
difficultyOut.append(problemsRank[str(1021)])
difficultyOut.append(problemsRank[str(1028)])
difficultyOut.append(problemsRank[str(1029)])
difficultyOut.append(problemsRank[str(1032)])
difficultyOut.append(problemsRank[str(1037)])

count1 = 14
count2 = 0
count3 = 0
count4 = 0

for x in range(len(data)):
    for problem in problems.find():
        try:
            if problem['contents']['problem_name'] == data[x]['problem_name']:
            #print(type(problem['problemID']))
                difficultyOut.append(problemsRank[str(problem['problemID'])])
                print('Finished Problem' + str(x))
                if data[x]['difficulty']=='1':
                    count1 = count1+1
                elif data[x]['difficulty']=='2':
                    count2 = count2+1
                elif data[x]['difficulty']=='3':
                    count3 = count3+1
        except KeyError as e:
            continue

difficultyOut.append(problemsRank[str(1101)])
difficultyOut.append(problemsRank[str(1105)])
difficultyOut.append(problemsRank[str(1120)])
difficultyOut.append(problemsRank[str(1149)])
difficultyOut.append(problemsRank[str(1183)])
difficultyOut.append(problemsRank[str(1340)])
difficultyOut.append(problemsRank[str(1349)])
difficultyOut.append(problemsRank[str(1383)])
difficultyOut.append(problemsRank[str(1446)])
difficultyOut.append(problemsRank[str(1464)])
difficultyOut.append(problemsRank[str(1553)])
difficultyOut.append(problemsRank[str(1634)])
difficultyOut.append(problemsRank[str(1694)])
difficultyOut.append(problemsRank[str(1790)])
difficultyOut.append(problemsRank[str(1980)])
difficultyOut.append(problemsRank[str(2165)])
"""