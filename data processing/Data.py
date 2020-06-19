from pymongo import MongoClient
from operator import itemgetter
import os
import json
import cmath


class Processor:

    def __init__(self):

        client = MongoClient('localhost', 27017)
        self.db = client['new_online_judge_2017']

    def loadCollections(self, colname):
        self.mycol = self.db[colname]
        return self.mycol

    def printCollections(self):
        print(self.db.list_collection_names())

if __name__ == "__main__":

    f = open("data10.json", "w+")

    with open("category-final.txt", "r") as lines:
        problems_labeled = { }
        for line in lines:
            problems_labeled[line.split(',', 1)[0]] = line.split(',', 1)[1].rstrip("\n")
    with open("difficultyNew.txt", "r") as lines:
        problems_difficulty = { }
        for line in lines:
            problems_difficulty[line.split(',', 1)[0]] = line.split(',', 1)[1].rstrip("\n")
    test = Processor()
    # test.printCollections()

    problems = test.loadCollections('mega_problems')
    problemsList = []
    problemIDList = []
    for problem in problems.find().sort('problemID'):
        if 'problem_difficulty' in problem:
            problemIDList.append(str(problem['problemID']))
            problemsList.append(problem['problem_difficulty'])

    
    profile = { }
    author_num = 100
    query_list = [ ]
    col_rankings = test.loadCollections("rankingActual")
    query = { }
    projection = { "author": 1, "ranking": 1 }
    month = { }
    for ranking in col_rankings.find(query, projection).sort('rankingF').limit(author_num):
        profile[ranking["author"]] = {"ranking": ranking["ranking"]}
        query_list.append(ranking["author"])
        
    count = 0
   
    for q in query_list:
        sum = 0
        validMonth = 0
        squareSum = 0
        for month in profile[q]['ranking']:
            sum += profile[q]['ranking'][month]
            validMonth += 1
        average = sum/validMonth
        for month in profile[q]['ranking']:
            squareSum += (profile[q]['ranking'][month] - average) * (profile[q]['ranking'][month] - average)
        variance = squareSum**0.5
        # print(variance)
        col_authors = test.loadCollections("mega_authors")
        query = { "author" : q }
        projection = {"author": 1, "num_problems_solved": 1, "num_submissions": 1, "count_errors": 1, "count_time_code_length": 1, }
        for author in col_authors.find(query, projection):
            # print(author['author'])
            skill0_raw = author["num_problems_solved"]
            skill0 = skill0_raw
            problems = author["count_time_code_length"]
            categorized = {"Introduction": 0, "DP": 0, "Search and Sort": 0, "Math": 0, "Big Number": 0, "Simulation": 0, "Others": 0, "Unlabeled": 0}
            difficultized = {"easy": 0, "medium": 0, "hard": 0}
            difficultizedTried = {"easy" :0, "medium": 0, "hard": 0}
            count = 0
            for problem in problems:
                count = count + 1
                startDifficulty = 1000
                if problem in problems_difficulty:
                    difficultyLevel = problems_difficulty[problem]
                else:
                    difficultyLevel = 'medium'
                if difficultyLevel == 'hard':
                    startDifficulty = count
                    break

            difficultProblems = []
            for problem in problems:
                #计算尝试难题的次数
                if problem in problems_difficulty:
                    difficultizedTried[problems_difficulty[problem]] = difficultizedTried[problems_difficulty[problem]] + 1
                    if problems_difficulty[problem] == 'hard':
                        difficultProblems.append(problem)
                else:
                    difficultizedTried['medium'] = difficultizedTried['medium'] + 1       
    
                #计算通过的题目的难度
                temp = -1
                for i in range(0, len(problems[problem])):
                    if problems[problem][i]['judgeStatus'] == "Accepted":
                        temp = i
                        break
                # print(temp)
                if temp != len(problems[problem]) and temp != -1:
                    if problem in problems_labeled:
                        categorized[problems_labeled[problem]] = categorized[problems_labeled[problem]] + 1
                    else:
                        categorized["Unlabeled"] = categorized["Unlabeled"] + 1
                    if problem in problems_difficulty:
                        difficultized[problems_difficulty[problem]] = difficultized[problems_difficulty[problem]] + 1
                    else:
                        difficultized['medium'] = difficultized['medium'] + 1

            tryDifficult = 0
            for i in range(0, len(difficultProblems)):
                tryDifficult += len(problems[difficultProblems[i]])
            # print(tryDifficult)            
                
            skill1_raw = float(difficultized["hard"]) / (difficultized["hard"] + difficultized["medium"] + difficultized["easy"])
           # if author['author'] == "15wutmx":
                #print(difficultized)
            skill1 = skill1_raw
            skill8 = tryDifficult
            category_num = 0
            for k, v in categorized.items():
                if v != 0:
                    category_num = category_num + 1
            skill2_raw = category_num
            skill2 = skill2_raw
            skill3_raw = author["num_submissions"]
            skill3 = skill3_raw
            error_wrong_types = {"Wrong Answer", "Time Limit Exceeded", "Memory Limit Exceeded", "Output Limit Exceeded", "Out Of Contest Time"}
            error_careless_types = {"Presentation Error", "Runtime Error", "Compilation Error", "System Error", "Restricted Function"}
            if "Accepted" in author["count_errors"]:
                error_correct = author["count_errors"]["Accepted"]
            error_wrong = 0
            for error in error_wrong_types:
                if error in author["count_errors"]:
                    error_wrong = error_wrong + author["count_errors"][error]
            error_careless = 0
            for error in error_careless_types:
                if error in author["count_errors"]:
                    error_careless = error_careless + author["count_errors"][error]
            skill4_raw = float(error_careless) / (error_correct + error_wrong + error_careless)
            skill4 = skill4_raw
            perfectionist_num = 0
            types = {"0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0}
            for problem in problems:
                submission_num = len(author["count_time_code_length"][problem])
                type = 2
                if submission_num == 1:
                    if author["count_time_code_length"][problem][0]["judgeStatus"] == "Accepted":
                        type = 1
                    else:
                        type = 0
                else:
                    accept = False
                    if author["count_time_code_length"][problem][0]["judgeStatus"] == "Accepted":
                        type = 3
                    else:
                        for i in range(0, submission_num):
                            if author["count_time_code_length"][problem][i]["judgeStatus"] == "Accepted":
                                if not accept:
                                    type = 4
                                else:
                                    type = 5
                                accept = True
                            else:
                                if accept:
                                    type = 5
                types[str(type)] = types[str(type)] + 1
                if type == 3 or type == 5:
                    perfectionist_num = perfectionist_num + 1
            skill5_raw = float(perfectionist_num) / len(problems)
            skill5 = skill5_raw
            skill6 = variance
            skill7 = startDifficulty
            skill = {"0": skill0, "1": skill1, "2": skill2, "3": skill3, "4": skill7, "5": skill5, "6": skill4, "7": skill6, "8": skill8 }
            # skill = {"0": skill0, "1": skill1, "2": skill2, "3": skill3, "4": skill4, "5": skill5, "6": skill6}
            # profile[author["author"]]["skill_point"] = skill
            profile[author["author"]]["problem_type"] = categorized
            #profile[author['author']]['submission_type'] = types #PUT BACK IF OVERALL IS WANTED
        
        col_sequence = test.loadCollections("sequences")
        query = { "author": q }
        activity = { }
        projection = { "author": 1, "sequence.time": 1, "sequence.judgeStatus": 1, "sequence.problemID": 1 }
        error_wrong_types = {"Wrong Answer", "Time Limit Exceeded", "Memory Limit Exceeded", "Output Limit Exceeded", "Out Of Contest Time", "Runtime Error", "Compilation Error", "System Error", "Restricted Function"}
        # error_careless_types = {"Presentation Error", "Runtime Error", "Compilation Error", "System Error", "Restricted Function"}
        error_careless_types = {"Presentation Error"}
        finished_problems = set()
        for esequence in col_sequence.find(query):
            monthSeq = ['2017-01','2017-02','2017-03','2017-04','2017-05','2017-06',
            '2017-07','2017-08','2017-09','2017-10','2017-11','2017-12', '2018-01',
            '2018-02','2018-03','2018-04','2018-05','2018-06','2018-07','2018-08']
            submission_type_numm = {}
            submission_type_ratio = {}
            for currentMonth in range(0,20):
                for currentDay in range(1,32):
                    submittype = {'0':0, '1': 0, '2': 0,'3':0,'4': 0,'5':0}
                    submitratio = {'0':0, '1': 0, '2': 0,'3':0,'4': 0,'5':0}
                    submitsum = 0
                    for singleSeq in range(len(esequence['event_sequence'])):
                        if currentDay<10:
                            if (monthSeq[currentMonth] + '-0' + str(currentDay)) in esequence['event_sequence'][singleSeq]['end_time']:
                                submitsum+=1
                                submittype[str(esequence['event_sequence'][singleSeq]['eventType'])] +=1
                        else:
                            if (monthSeq[currentMonth] + '-' + str(currentDay)) in esequence['event_sequence'][singleSeq]['end_time']:
                                submitsum+=1
                                submittype[str(esequence['event_sequence'][singleSeq]['eventType'])] +=1
                    if currentDay<10:
                        submission_type_numm[(monthSeq[currentMonth] + '-0' + str(currentDay))] = submittype
                    elif (monthSeq[currentMonth] == '2017-02' or monthSeq[currentMonth] == '2018-02'):
                        if currentDay<29:
                            submission_type_numm[(monthSeq[currentMonth] + '-' + str(currentDay))] = submittype
                    elif (monthSeq[currentMonth] == '2017-04' or monthSeq[currentMonth] == '2018-04' or monthSeq[currentMonth] == '2017-06' or monthSeq[currentMonth] == '2018-06' or monthSeq[currentMonth] == '2017-09' or monthSeq[currentMonth] == '2017-11'):
                        if currentDay<31:
                            submission_type_numm[(monthSeq[currentMonth] + '-' + str(currentDay))] = submittype
                    else:
                        submission_type_numm[(monthSeq[currentMonth] + '-' + str(currentDay))] = submittype
                    for i in range(0, 6):
                        if submitsum == 0:
                            submitratio[str(i)] = 0
                        else:
                            submitratio[str(i)] = submittype[str(i)]/submitsum
                    if currentDay<10:
                        submission_type_ratio[(monthSeq[currentMonth] + '-0' + str(currentDay))] = submitratio
                    elif (monthSeq[currentMonth] == '2017-02' or monthSeq[currentMonth] == '2018-02'):
                        if currentDay<29:
                            submission_type_ratio[(monthSeq[currentMonth] + '-' + str(currentDay))] = submitratio
                    elif (monthSeq[currentMonth] == '2017-04' or monthSeq[currentMonth] == '2018-04' or monthSeq[currentMonth] == '2017-06' or monthSeq[currentMonth] == '2018-06' or monthSeq[currentMonth] == '2017-09' or monthSeq[currentMonth] == '2017-11'):
                        if currentDay<31:
                            submission_type_ratio[(monthSeq[currentMonth] + '-' + str(currentDay))] = submitratio
                    else:
                        submission_type_ratio[(monthSeq[currentMonth] + '-' + str(currentDay))] = submitratio
           
            profile[author['author']]['submission_type_num'] = submission_type_numm
            profile[author['author']]['submission_type_ratio'] = submission_type_ratio
        
        for sequence in col_sequence.find(query, projection):
            # startDifficulty = 1000
            # interval = 10
            # noteasy = 0
            # for i in range(1, len(sequence['sequence'])):
            #     default = 'medium'
            #     if sequence['sequence'][i]['problemID'] != sequence['sequence'][i-1]['problemID']:
            #         interval -= 1
            #         if problems_difficulty.get(sequence['sequence'][i-1]['problemID'], default) != 'easy':
            #             noteasy += 1
            #             if interval >= 0 and noteasy == 3:
            #                 startDifficulty = i - 5
            #                 break
            #             elif interval == 0:
            #                 interval = 10
            #                 noteasy = 0
            possible_months = {"2017-01", "2017-02", "2017-03", "2017-04", "2017-05", "2017-06", "2017-07", "2017-08", "2017-09", "2017-10", "2017-11", "2017-12", "2018-01", "2018-02", "2018-03", "2018-04", "2018-05", "2018-06", "2018-07", "2018-08"}
            month_difficulty = { }
            month_errortype = { }
            month_errortypeS = { }
            for possible_month in possible_months:
                for currentDay in range(1,32):
                    difficultized_month = {"easy": 0, "medium": 0, "hard": 0}
                    accept_num = 0
                    wrong_num = 0
                    careless_num = 0
                    for m in sequence["sequence"]:
                        if m["time"][:7] == possible_month and (m["time"][8:10] == str(currentDay) or m["time"][8:10] == ('0'+str(currentDay))):
                            if m["judgeStatus"] == "Accepted":
                                accept_num = accept_num + 1
                                if m["problemID"] not in finished_problems and m["problemID"] in problems_difficulty:
                                    difficultized_month[problems_difficulty[m["problemID"]]] = difficultized_month[problems_difficulty[m["problemID"]]] + 1
                                    finished_problems.add(m["problemID"])
                                elif m["problemID"] not in finished_problems:
                                    difficultized_month['medium'] = difficultized_month['medium'] + 1
                                    finished_problems.add(m["problemID"])
                            elif m["judgeStatus"] in error_wrong_types:
                                wrong_num = wrong_num + 1
                            else:
                                careless_num = careless_num + 1

                    #if author['author'] == "15wutmx":
                    #    print(difficultized_month)
                    if currentDay<10:
                        month_results_difficulty = difficultized_month
                        month_results_errortype = {"accepted_num": accept_num, "wrong_answer_num": wrong_num, "careless_num": careless_num}
                        month_difficulty[possible_month+'-0'+str(currentDay)] = month_results_difficulty
                        month_errortype[possible_month+'-0'+str(currentDay)] = month_results_errortype
                        sum_errortype = accept_num + wrong_num + careless_num
                        month_errortypeS[possible_month+'-0'+str(currentDay)] = sum_errortype
                    elif (possible_month == '2017-02' or possible_month == '2018-02'):
                        if currentDay<29:
                            month_results_difficulty = difficultized_month
                            month_results_errortype = {"accepted_num": accept_num, "wrong_answer_num": wrong_num, "careless_num": careless_num}
                            month_difficulty[possible_month+'-'+str(currentDay)] = month_results_difficulty
                            month_errortype[possible_month+'-'+str(currentDay)] = month_results_errortype
                            sum_errortype = accept_num + wrong_num + careless_num
                            month_errortypeS[possible_month+'-'+str(currentDay)] = sum_errortype
                    elif (possible_month == '2017-04' or possible_month == '2018-04' or possible_month == '2017-06' or possible_month == '2018-06' or possible_month== '2017-09' or possible_month == '2017-11'):
                        if currentDay<31:
                            month_results_difficulty = difficultized_month
                            month_results_errortype = {"accepted_num": accept_num, "wrong_answer_num": wrong_num, "careless_num": careless_num}
                            month_difficulty[possible_month+'-'+str(currentDay)] = month_results_difficulty
                            month_errortype[possible_month+'-'+str(currentDay)] = month_results_errortype
                            sum_errortype = accept_num + wrong_num + careless_num
                            month_errortypeS[possible_month+'-'+str(currentDay)] = sum_errortype 
                    else:
                        month_results_difficulty = difficultized_month
                        month_results_errortype = {"accepted_num": accept_num, "wrong_answer_num": wrong_num, "careless_num": careless_num}
                        month_difficulty[possible_month+'-'+str(currentDay)] = month_results_difficulty
                        month_errortype[possible_month+'-'+str(currentDay)] = month_results_errortype
                        sum_errortype = accept_num + wrong_num + careless_num
                        month_errortypeS[possible_month+'-'+str(currentDay)] = sum_errortype 

                    # for possible_month in possible_months:
                    #     if possible_month not in month_difficulty.keys():
                    #         month_difficulty[possible_month] = {"easy": 0, "medium": 0, "hard": 0}
                    #     if possible_month not in month_errortype.keys():
                    #         month_errortype[possible_month] = {"accepted_num": 0, "wrong_answer_num": 0, "careless_num": 0}
            # skill7 = startDifficulty
            # skill = {"0": skill0, "1": skill1, "2": skill2, "3": skill3, "4": skill7, "5": skill5, "6": skill4, "7": skill6, "8": skill8 }
            profile[author["author"]]["skill_point"] = skill
            profile[author["author"]]["accept_num"] = month_difficulty
            profile[author["author"]]["errortype_num"] = month_errortype
            profile[author["author"]]['errortype_num_sum'] = month_errortypeS
        for esequence in col_sequence.find(query):
            listF = []
            for singleSeq in range(len(esequence['event_sequence'])):
                problemID = esequence['event_sequence'][singleSeq]['problemID']
                diff = 0
                if problemID in problemIDList:
                    diff = problemsList[problemIDList.index(problemID)]
                listF.append({'problemID': problemID, 'difficulty':diff, 'submission_type':esequence['event_sequence'][singleSeq]['eventType'], 'end_date':esequence['event_sequence'][singleSeq]['end_time']})
            profile[author["author"]]['problem_sequence'] = listF
                
        for esequence in col_sequence.find(query):
            problemTypeDict = {"Introduction": '0', "DP": '0', "Search and Sort": '0', "Math": '0', "Big Number": '0', "Simulation":'0', "Others": '0', "Unlabeled": '0'}
            for singleSeq in range(len(esequence['event_sequence'])):
                problemID = esequence['event_sequence'][singleSeq]['problemID']
                if problemID in problems_labeled and (problemTypeDict[problems_labeled[problemID]] == str(0)):
                    problemTypeDict[problems_labeled[problemID]] = esequence['event_sequence'][singleSeq]['end_time']
                elif (problemID not in problems_labeled) and (problemTypeDict['Unlabeled'] == str(0)):
                    problemTypeDict['Unlabeled'] = esequence['event_sequence'][singleSeq]['end_time']

            profile[author["author"]]['dateType'] = problemTypeDict
            
            dateTypeList = [(name, date) for name, date in problemTypeDict.items()] 
            problemTypeList = [(name, num) for name, num in profile[author['author']]['problem_type'].items()]  
            finalList = []
            for obj in range(len(dateTypeList)):
                finalList.append((dateTypeList[obj][0],dateTypeList[obj][1],problemTypeList[obj][1]))
            sortedList = sorted(finalList,key=itemgetter(1))
            profile[author["author"]]['typeList'] = sortedList
        
        submissionSeq = []
        for sequence in col_sequence.find(query):  
            for seq in sequence['sequence']:
                temp = {}
                temp['problemID'] = seq['problemID']
                if seq['problemID'] in problemIDList:
                    temp['difficulty'] = problemsList[problemIDList.index(seq['problemID'])]
                temp['judgeStatus'] = seq['judgeStatus']
                temp['time'] = seq['time']
                submissionSeq.append(temp)
            profile[author['author']]['submission_sequence']= submissionSeq
    profile = json.dumps(profile)
    f.write(profile)
    f.close()
