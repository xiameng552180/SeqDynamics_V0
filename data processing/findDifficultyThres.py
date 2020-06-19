import MongoProcessor
import json
import matplotlib.pyplot as plt

connection = MongoProcessor.Processor()
problems = connection.loadCollections('mega_problems')
sequences = connection.loadCollections('sequences')

f = open("difficultyFinal.txt", "w+")

difList = []
for problem in problems.find():
    if (problem['problem_difficulty'] < 0) or (problem['problem_difficulty']>1):
        problems.update_one({"problemID": problem['problemID']}, {"$set": {"problem_difficulty": 0}})
        difList.append(problem)

# with open("difficulty.txt", "r") as lines:
#     for line in lines:
#         difficulty = line.split(',', 1)[1].rstrip("\n")
#         difList.append(difficulty)


#0.5, 0.8
for problem in problems.find():

    if problem['problem_difficulty']<0.4:
        f.write(str(problem['problemID']) + ",easy\n")
    elif problem['problem_difficulty']<0.6:
        f.write(str(problem['problemID']) + ",medium\n")
    else:
        f.write(str(problem['problemID']) + ",hard\n")

f.close()

# for author in sequences.find().limit:
"""

plt.plot(difList)
plt.show()
plt.cla()
"""