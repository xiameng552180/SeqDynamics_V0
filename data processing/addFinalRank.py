import MongoProcessor

connection = MongoProcessor.Processor()
authors = connection.loadCollections('rankingActual')

for author in authors.find():
    authors.update_one({"author": author['author']}, {"$set": {"rankingF":author['ranking']['2018-8'] }})