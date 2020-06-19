import MongoProcessor
connection = MongoProcessor.Processor()

collection = connection.loadCollections('mega_authors')
collection2 = connection.loadCollections('sequences')

"""
collection.delete_many({"author":{"$regex": "judge"}})
collection.delete_many({"author":{"$regex": "nlgx"}})
"""
"""
collection2.delete_many({"author":{"$regex": "judge"}})
collection2.delete_many({"author":{"$regex": "nlgx"}})
"""
delete = []
with open("peoplelist.txt", "r") as file:
    for line in file:
        #print(line)
        delete.append(line)
result = [x.strip() for x in delete[0].split(',')]
for name in result:
    collection.delete_one({"author":{"$regex": name}})
    collection2.delete_one({"author":{"$regex": name}})
  