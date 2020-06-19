import pymongo
import pprint
import pandas as pd
class dbfunc:
    def getoneseq(self):
        myclient = pymongo.MongoClient("mongodb://localhost:27017/")
        mydb = myclient["online_judge"]

        db_sub = mydb["submissions2017"]
        db_author = mydb['authors2017']
        db_mega = mydb['mega_author2017']
        db_problems = mydb['problems2017']
        db_seq = mydb['sequences2017']

        pipeline = [
            {"$match":  {"author": {'$exists': True},"judgeStatus": "Accepted"}},
            {"$group": {
                "_id": "$author",
                "count": {"$sum": 1}
            }}
        ]
        x = db_sub.aggregate(pipeline, allowDiskUse=True)

        x = list(x)

        filternum = []
        for i in range(len(x)):
            if x[i][u'count']>300:
                filternum.append(x[i])

        selectid = filternum[0]['_id']

        idpipeline = [
            {"$match":{"author": selectid}}
        ]

        y = pd.DataFrame(list(db_sub.aggregate(idpipeline, allowDiskUse=True)))

        def computetime(arr):
            date = arr.split(' ')[0]
            return date
        y['time'] = y['time'].map(lambda x: computetime(x))

        def codelength(arr):
            # if (arr != 'null') & (len(arr) > 0):
            #     arr = arr.substring(0, len(arr) - 1)
            return int(arr[:-1])
        y['codeLength'] = y['codeLength'].map(lambda x: codelength(x))

        y = y.drop(['_id','nickName','runID'],axis=1)

        diffmax = y['codeLength'].max()
        diffmin = y['codeLength'].min()
        diffgap = (diffmax-diffmin+1)/4
        def definediff(arr):
            if diffmin<=arr<diffmin+diffgap:
                return 1
            elif diffmin+diffgap <= arr < diffmin+diffgap*2:
                return 2
            elif diffmin+diffgap*2 <= arr < diffmin+diffgap*3:
                return 3
            else: return 4

        y['codeLength'] = y['codeLength'].map(lambda x: definediff(x)) 

        dateprob = y.groupby(['time','problemID']).agg({'codeLength':max}).reset_index()
        datenum = dateprob.groupby(['time','codeLength']).count().reset_index().rename(columns={'time':'date','codeLength':'difficulty','problemID':'number'})
        print(type(datenum))
        datenum.to_json('server/static/json/oneseq.json',orient = 'records')
        return datenum.to_json('server/static/json/oneseq.json',orient = 'records')


# x = dbfunc()
# print(x.getoneseq())