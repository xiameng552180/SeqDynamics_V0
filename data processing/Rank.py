from pymongo import MongoClient
import os
import json

class Processor:

    def __init__(self):

        client = MongoClient('localhost', 27017)
        self.db = client['online_judge_2017']

    def loadCollections(self, colname):
        self.mycol = self.db[colname]
        return self.mycol

    def printCollections(self):
        print(self.db.list_collection_names())

if __name__ == "__main__":

    with open("category-final.txt", "r") as lines:
        problems_labeled = { }
        for line in lines:
            problems_labeled[line.split(',', 1)[0]] = line.split(',', 1)[1].rstrip("\n")
        # print(problems_labeled)

    test = Processor()
    test.printCollections()

    # mycol = test.loadCollections("authorRankFiltered")
    # query = { }
    # filtered_authors = { }
    # for i in mycol.find(query):
    #     filtered_authors = i
    f = open("rank.json", "w+")
    profile = { }
    author_num = 10

    query_list = [ ]
    col_author_list = test.loadCollections("mega_authors")
    query = { }
    projection = {"author": 1 }
    for author in col_author_list.find(query, projection):
        query_list.append(author["author"])

    # print(query_list)

    for q in query_list:

        col_rankings = test.loadCollections("rankEachMonth")
        query = { }
        projection = { "month": 1, "rankings": 1 }
        month = { }
        for ranking in col_rankings.find(query, projection):
            # print(ranking["rankings"])
            for i in range(2017, 2019):
                for j in range(1, 13):
                    sorted_ranking = sorted(ranking["rankings"].items(), key=lambda x: (-x[1], x[0]))
                    if j < 10:
                        if ranking["month"] == str(i) + "-0" + str(j):
                            if q in ranking["rankings"]:
                                ranking_num = 1
                                for r in sorted_ranking:
                                    if r[0] == q:
                                        break
                                    ranking_num = ranking_num + 1
                                # print(q)
                                # print(ranking_num)
                                month[str(i) + "-" + str(j)] = ranking_num
                            else:
                                month[str(i) + "-" + str(j)] = "N/A"
                    else:
                        if ranking["month"] == str(i) + "-" + str(j):
                            if q in ranking["rankings"]:
                                ranking_num = 1
                                for r in sorted_ranking:
                                    if r[0] == q:
                                        break
                                    ranking_num = ranking_num + 1
                                # print(q)
                                # print(ranking_num)
                                month[str(i) + "-" + str(j)] = ranking_num
                            else:
                                month[str(i) + "-" + str(j)] = "N/A"
        # print(month)
        profile[q] = {"ranking": month}
    profile = json.dumps(profile)
    f.write(profile)
    f.close()
