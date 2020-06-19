import MongoProcessor
import json
import matplotlib.pyplot as plt
import csv
import operator
import pymongo
connection = MongoProcessor.Processor()
rankMonth = connection.loadCollections('rankEachMonth')
authors = connection.loadCollections('mega_authors')
outputCollection = connection.loadCollections('rankingActual')

monthIter = ['2017-1','2017-2','2017-3','2017-4','2017-5','2017-6','2017-7','2017-8','2017-9','2017-10','2017-11','2017-12',
'2018-1','2018-2','2018-3','2018-4','2018-5','2018-6','2018-7', '2018-8']
result = authors.create_index([('ranking', pymongo.DESCENDING)],unique=False)
for author in authors.find().batch_size(1000000000).limit(1000):
    j = 0
    monthDict = {}
    for ranking in rankMonth.find():
        print(ranking)
        sortedRank = sorted(ranking['rankings'].items(), key=operator.itemgetter(1))
        sortedRank = sortedRank[::-1]
        newRank = []
        for i in range(len(sortedRank)):
            newRank.append((sortedRank[i][0],i+1))
        for i in range(len(newRank)):
            if author['author'] == newRank[i][0]:

                monthDict[monthIter[j]] = newRank[i][1]
        j = j + 1
    outputCollection.insert_one({'author': author['author'],'ranking':monthDict})
print('done')
#for rank in rankMonth.find():



"""
for author in authors.find().sort('ranking', -1).limit(1):
    for rank in rankMonth.find().limit(1):
        print(rank['rankings'][author['author']])
        #if author['author'] in rank:
"""