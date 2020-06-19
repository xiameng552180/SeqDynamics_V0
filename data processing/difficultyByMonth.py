import MongoProcessor
import pymongo
from datetime import datetime

connection = MongoProcessor.Processor()
authors = connection.loadCollections('mega_authors')
problems = connection.loadCollections('mega_problems')
outputCollection = connection.loadCollections('authorDifMonth')

"""
for author in authors.find().limit(1):
    authorAll = {}
    authorDM = {}
    for problem in problems.find():
        if str(problem['problemID']) in author['count_time_code_length']:
            for solveList in author['count_time_code_length'][str(problem['problemID'])]:
                if solveList['judgeStatus'] == 'Accepted':
                    ts = solveList['time']
                    timeString = datetime.utcfromtimestamp(ts).strftime('%Y-%m')
                    if timeString in authorDM:
                        if authorDM[timeString]<problem['difficulty']:
                            authorDM[timeString] = problem['difficulty']
                    else:
                        authorDM[timeString] = problem['difficulty']
    authorAll[author['author']] = authorDM
    outputCollection.insert_one(authorAll)

print('done')
"""
for author in authors.find().batch_size(1000000000).sort('ranking', -1).limit(1000):
    authorAll = {}
    authorDM = {}
    if 'judge' not in author['author']:
        for problemID in author['count_time_code_length']:
            for solveList in author['count_time_code_length'][problemID]:
                for problem in problems.find({'problemID': int(problemID)}).limit(1):
                    #problem['difficulty'])
                    ts = solveList['time']
                    timeString = datetime.utcfromtimestamp(ts).strftime('%Y-%m')
                    if timeString in authorDM:
                        if authorDM[timeString]<problem['difficulty']:
                            authorDM[timeString] = problem['difficulty']
                    else:
                        authorDM[timeString] = problem['difficulty']
        authorAll[author['author']] = [authorDM, author['ranking']]
        outputCollection.insert_one(authorAll)
        print('auhor ' + author['author'] + ' done')
       # problems.find({'problemID': int(solveList)})
print('done')           
   