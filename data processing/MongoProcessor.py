from pymongo import MongoClient

class Processor:

    def __init__(self):

        client = MongoClient('localhost', 27017)
        self.db = client['new_online_judge_2017']
        """
        trial = db.getCollection("authors2017")
        self.col_authors = db.author
        self.col_posts = db.posts
        self.col_sequence = db.sequence
        self.col_sequence_full = db.sequence_full
        self.col_submission = db.submission
        """

    def loadCollections(self, colname):
        self.mycol = self.db[colname]
        return self.mycol

    def printCollections(self):
        print(self.db.list_collection_names())

if __name__ == "__main__":

    MOTIVATION_THRESHOLD_LIFETIME = 2
    MOTIVATION_THRESHOLD_DAILY = 1
    PERFECTIONIST_THRESHOLD_LIFETIME = 3
    PERFECTIONIST_THRESHOLD_PER_QS = 2
    PERFECTIONIST_THRESHOLD_QS_RATIO = 0.2
    PERSEVERANCE_THRESHOLD_LIFETIME = 2 # drawback: what if user answers correctly on first try?
    PERSEVERANCE_THRESHOLD_PER_QS = 2 #  number of fails per questions
    PERSEVERANCE_THRESHOLD_QS_RATIO = 0.5 # percentage of all questions answered correctly with more than or equal to PERSEVERANCE_THRESHOLD_PER_QS fails
    CARELESS_THRESHOLD = 1

    # connect to mongodb and link to the database
    test = Processor()
    test.printCollections()
    # db = input("Database: ")
    # mycol = test.loadCollections(db)

    # filter options
    # query = { "author": { "$regex": "^h" } }
    # query = { "count_time_code_length.1002.executeTime": "15" }

    # self-regulation / motivation (lifetime)
    # mycol = test.loadCollections("mega_author2017")
    # query = { }
    # projection = { "author": 1, "num_problems": 1, "num_days": 1 }
    # for x in mycol.find(query, projection).limit(50):
    #     if (x["num_problems"] / x["num_days"] > MOTIVATION_THRESHOLD_LIFETIME):
    #         print('')
    #         print(x["author"])

    # self-regulation / motivation (daily)
    # mycol = test.loadCollections("sequences2017")
    # query = { }
    # projection = { "author": 1, "sequence.time": 1, "sequence.judgeStatus": 1 }
    # for x in mycol.find(query, projection).limit(10):
    #     print('')
    #     print(x["author"])
    #     dates = [ ]
    #     for d in x["sequence"]:
    #         # if d["judgeStatus"] == "Accepted":
    #         dates.append(d["time"][:10])
    #     daily = { }
    #     for s in set(dates):
    #         daily[s] = dates.count(s)
    #     print("Daily:", daily)
    #     months = set()
    #     for k in daily.keys():
    #         months.add(k[:7])
    #     # print(months)
    #     monthly = { }
    #     for m in months:
    #         monthly_count = 0
    #         for k, v in daily.items():
    #             if k[:7] == m:
    #                 monthly_count = monthly_count + v
    #         monthly[m] = monthly_count
    #     print("Monthly:", monthly)

    # perfectionist (lifetime)
    # mycol = test.loadCollections("mega_author2017")
    # query = { }
    # projection = { "author": 1, "num_correct": 1, "num_problems": 1 }
    # for x in mycol.find(query, projection).limit(50):
    #     if x["num_correct"] / x["num_problems"] > PERFECTIONIST_THRESHOLD_LIFETIME:
    #         # print(x)
    #         print('')
    #         print(x["author"])
    #         print(str(x["num_problems"]) + ":" + str(x["num_correct"]))

    # perfectionist (per question)
    # mycol = test.loadCollections("sequences2017")
    # query = { }
    # projection = { "author": 1, "sequence.problemID": 1, "sequence.judgeStatus": 1 }
    # for x in mycol.find(query, projection).limit(10):
    #     problems = set()
    #     for d in x["sequence"]:
    #         problems.add(d["problemID"])
    #     perfectionist = { }
    #     for p in problems:
    #         accept = False
    #         accept_count = 0
    #         for d in x["sequence"]:
    #             if d["problemID"] == p:
    #                 if d["judgeStatus"] == "Accepted":
    #                     if not accept:
    #                         accept = True
    #                     accept_count = accept_count + 1
    #         if accept:
    #             perfectionist[p] = accept_count
    #         else:
    #             continue
    #         # print(p)
    #         # print(accept_count)
    #         # print("---")
    #     # print(perfectionist)
    #     perfectionist_qs_count = 0
    #     for v in perfectionist.values():
    #         if v >= PERFECTIONIST_THRESHOLD_PER_QS:
    #             perfectionist_qs_count = perfectionist_qs_count + 1
    #     # print(perfectionist_qs_count)
    #     # print(len(perfectionist))
    #     # print("---")
    #     if perfectionist_qs_count / len(perfectionist) >= PERFECTIONIST_THRESHOLD_QS_RATIO:
    #         print('')
    #         print(x["author"])
    #         print(str(perfectionist_qs_count) + ":" + str(len(perfectionist)))
    #         print(perfectionist)

    # perseverance (lifetime)
    # mycol = test.loadCollections("mega_author2017")
    # query = { }
    # projection = { "author": 1, "count_errors": 1, "num_correct": 1 }
    # for x in mycol.find(query, projection).limit(10):
    #     total = sum(x["count_errors"].values())
    #     if total / x["num_correct"] >= PERSEVERANCE_THRESHOLD_LIFETIME:
    #         print('')
    #         print(x["author"])
    #         print(str(x["num_correct"]) + ":" + str(total))

    # perseverance (per question)
    mycol = test.loadCollections("sequences2017")
    query = { }
    projection = { "author": 1, "sequence.problemID": 1, "sequence.judgeStatus": 1 }
    for x in mycol.find(query, projection).limit(10):
        problems = set()
        for d in x["sequence"]:
            problems.add(d["problemID"])
        perseverance = { }
        for p in problems:
            accept = False
            reject_count = 0
            for d in x["sequence"]:
                if d["problemID"] == p:
                    if d["judgeStatus"] == "Accepted":
                        accept = True
                    else:
                        reject_count = reject_count + 1
            if accept and reject_count != 0:
                perseverance[p] = reject_count
            elif accept and reject_count == 0:
                continue
            else:
                perseverance[p] = 0
            # print(p)
            # print(reject_count)
            # print("---")
        perseverance_qs_count = 0
        for v in perseverance.values():
            if v >= PERSEVERANCE_THRESHOLD_PER_QS:
                perseverance_qs_count = perseverance_qs_count + 1
        # print(perseverance_qs_count)
        # print(len(perseverance))
        # print("---")
        if perseverance_qs_count / len(perseverance) >= PERSEVERANCE_THRESHOLD_QS_RATIO:
            print('')
            print(x["author"])
            print(str(perseverance_qs_count) + ":" + str(len(perseverance)))
            print(perseverance)










    # count = 0
    # for x in mycol.find(query, projection):
    # # for x in mycol.find(query):
    #     if count == 2:
    #         break
    #     count = count + 1
    #     print('')
    #     print(x)
