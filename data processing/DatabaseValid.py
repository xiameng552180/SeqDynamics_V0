from pymongo import MongoClient
from datetime import datetime
from time import mktime, strptime
import pandas
import threading
from pymongo.errors import DuplicateKeyError
from pymongo.errors import DocumentTooLarge
from pymongo.errors import CursorNotFound

class DatabaseValid:

    def __init__(self):

        client = MongoClient('localhost', 27017)
        self.db = client['submits_database']

    def loadCollections(self, colname):
        self.mycol = self.db[colname]
        return self.mycol

    def getAuthor(self):
        table = self.loadCollections("authors").find({'author':'shadow'})
        # problems = list(table.find({}, {"count_submits": 1, "count_judge_status": 1, "problemID": 1, "_id": 0}))
        # problems = sorted(problems, key = lambda s: int(s["problemID"]))
        return table
      
if __name__ == "__main__":

    test = DatabaseValid()

    # # filter the posts after 2017 
    # baseline = mktime(strptime("2017-01-01 00:00:00", '%Y-%m-%d %H:%M:%S'))
    # print(baseline)
    # for post in test.loadCollections("posts").find():
    #     if post['time'] >= 1483200000.0:
    #         test.loadCollections("newposts").insert(post)
    
    # get all the authors
    # authors = test.loadCollections("newposts").distinct("author")
    # test.loadCollections("newauthors").insert_many([{"author": temp_each} for temp_each in authors])
    
    # get all the sequences
    def insertThis(author_name):
        db_newposts = test.loadCollections("newposts")
        submits = db_newposts.find({"author": author_name})
    try:
        df_submits = pandas.DataFrame(list(submits))

        # change index to time
        df_submit_time = df_submits.set_index('time')

        info_submit = df_submit_time.groupby(by="problemID")["judgeStatus"]


    # print(test.getAuthor()[0])