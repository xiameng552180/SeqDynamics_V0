import MongoProcessor 

connection = MongoProcessor.Processor()
authors = connection.loadCollections('mega_authors')
rankMonth = connection.loadCollections('rankEachMonth')



for ranking in rankMonth.find({'month': '2017-12'}):
    for author in authors.find():
        if author['author'] in ranking['rankings']:
            authors.update_one({"author": author['author']}, {"$set": {"ranking": ranking['rankings'][author['author']]}})
        else:
            authors.update_one({"author": author['author']}, {"$set": {"ranking": 0}})
        