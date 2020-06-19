from sklearn.datasets import load_digits
from sklearn.manifold import MDS
import matplotlib.pyplot as plt
import pandas as pd
import json


with open('data6.json') as f:
    data = json.load(f)
authorList = []
skillpointList = []
for author in data:
    authorList.append(author)
    temp = []
    for i in range(0,8):
        if i !=4 and i!=5 and i!=6:
            temp.append(data[author]['skill_point'][str(i)])
    skillpointList.append(temp)

print('done loading')
embedding = MDS(n_components=2)
X_transformed = embedding.fit_transform(skillpointList[:150])
print(X_transformed)
xList = []
yList = []
for i in range(len(X_transformed)):
    xList.append(X_transformed[i][0])
    yList.append(X_transformed[i][1])

plt.plot(xList[:20], yList[:20], 'bs', xList[50:100], yList[50:100], 'rs',xList[100:150], yList[100:150], 'g^')
plt.show()
"""
plt.plot(X_transformed)
plt.show()
plt.cla()
"""