import MongoProcessor
import pymongo
import json 
connection = MongoProcessor.Processor()
rankMonth = connection.loadCollections('rankEachMonth')
authors = connection.loadCollections('mega_authors')
rankraw = connection.loadCollections('rank_raw')
with open('rank.json', 'w') as fp:
    result = authors.create_index([('ranking', pymongo.DESCENDING)],unique=False)
    for author in authors.find().batch_size(1000000000).sort('ranking',-1).limit(1000):
        json.dump({'author': author['author'], 'ranking':author['ranking']}, fp)