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

    f = open("activity.json", "w+")

    test = Processor()
    test.printCollections()

    # mycol = test.loadCollections("authorRankFiltered")
    # query = { }
    # filtered_authors = { }
    # for i in mycol.find(query):
    #     filtered_authors = i

    mycol = test.loadCollections("sequences")
    query = { }
    activity = { }
    projection = { "author": 1, "sequence.time": 1, "sequence.judgeStatus": 1 }
    for x in mycol.find(query, projection):
        # if x["author"] in filtered_authors:
            # rank = filtered_authors[x["author"]]
        dates = [ ]
        for d in x["sequence"]:
            # if d["judgeStatus"] == "Accepted":
            #     dates.append(d["time"][:10])
            dates.append(d["time"][:10])
        daily = { }
        for s in set(dates):
            daily[s] = dates.count(s)
        for i in range(2017, 2019):
            for j in range(1, 13):
                if j in (1, 3, 5, 7, 8, 10, 12):
                    for k in range(1, 32):
                        if len(str(j)) == 1:
                            j = "0" + str(j)
                        if len(str(k)) == 1:
                            k = "0" + str(k)
                        day = str(i) + "-" + str(j) + "-" + str(k)
                        if day not in daily:
                            daily[day] = 0
                elif j == 2:
                    for k in range(1, 29):
                        if len(str(j)) == 1:
                            j = "0" + str(j)
                        if len(str(k)) == 1:
                            k = "0" + str(k)
                        day = str(i) + "-" + str(j) + "-" + str(k)
                        if day not in daily:
                            daily[day] = 0
                else:
                    for k in range(1, 31):
                        if len(str(j)) == 1:
                            j = "0" + str(j)
                        if len(str(k)) == 1:
                            k = "0" + str(k)
                        day = str(i) + "-" + str(j) + "-" + str(k)
                        if day not in daily:
                            daily[day] = 0
        # 1   2   3   4   5   6   7   8   9   10  11  12
        # 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 - 2017
        # 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 - 2018
        # print(daily)
        # print('')

        weekly = { }
        day_count = 0
        for i in range(2017, 2019):
            for j in range(1, 13):
                if j in (1, 3, 5, 7, 8, 10, 12):
                    for k in range(1, 32):
                        day_count = day_count + 1
                        if i == 2017:
                            week_count = int((day_count + 5) / 7)
                        elif i == 2018:
                            week_count = int((day_count + 6) / 7)
                        if len(str(j)) == 1:
                            j = "0" + str(j)
                        if len(str(k)) == 1:
                            k = "0" + str(k)
                        day = str(i) + "-" + str(j) + "-" + str(k)
                        if day in daily:
                            week = str(i) + "-" + str(week_count)
                            if week in weekly:
                                weekly[str(i) + "-" + str(week_count)] = weekly[str(i) + "-" + str(week_count)] + daily[day]
                            else:
                                weekly[str(i) + "-" + str(week_count)] = daily[day]
                elif j == 2:
                    for k in range(1, 29):
                        day_count = day_count + 1
                        if i == 2017:
                            week_count = int((day_count + 5) / 7)
                        elif i == 2018:
                            week_count = int((day_count + 6) / 7)
                        if len(str(j)) == 1:
                            j = "0" + str(j)
                        if len(str(k)) == 1:
                            k = "0" + str(k)
                        day = str(i) + "-" + str(j) + "-" + str(k)
                        if day in daily:
                            week = str(i) + "-" + str(week_count)
                            if week in weekly:
                                weekly[str(i) + "-" + str(week_count)] = weekly[str(i) + "-" + str(week_count)] + daily[day]
                            else:
                                weekly[str(i) + "-" + str(week_count)] = daily[day]
                else:
                    for k in range(1, 31):
                        day_count = day_count + 1
                        if i == 2017:
                            week_count = int((day_count + 5) / 7)
                        elif i == 2018:
                            week_count = int((day_count + 6) / 7)
                        if len(str(j)) == 1:
                            j = "0" + str(j)
                        if len(str(k)) == 1:
                            k = "0" + str(k)
                        day = str(i) + "-" + str(j) + "-" + str(k)
                        if day in daily:
                            week = str(i) + "-" + str(week_count)
                            if week in weekly:
                                weekly[str(i) + "-" + str(week_count)] = weekly[str(i) + "-" + str(week_count)] + daily[day]
                            else:
                                weekly[str(i) + "-" + str(week_count)] = daily[day]
            day_count = 0
        # print(weekly)
        # print('')

        months = set()
        for k in daily.keys():
            months.add(k[:7])
        monthly = { }
        for m in months:
            monthly_count = 0
            for k, v in daily.items():
                if k[:7] == m:
                    monthly_count = monthly_count + v
            monthly[m] = monthly_count
            for i in range(2017, 2019):
                for j in range(1, 13):
                    if len(str(j)) == 1:
                        j = "0" + str(j)
                    month = str(i) + "-" + str(j)
                    if month not in monthly:
                        monthly[month] = 0
        # print(monthly)

        activity[x["author"]] = [daily, weekly, monthly]

    # print(activity)

    output = json.dumps(activity)
    # print(output)

    f.write(output)
    f.close()
