import MongoProcessor
import time
import datetime
import csv
connection = MongoProcessor.Processor()
top50 = connection.loadCollections('rankingActual')
sequence = connection.loadCollections('sequences')
listpeople = []

for name in top50.find().limit(30):
    for person in sequence.find({'author': name['author']}):
         if person['event_sequence'][0]['start_time'][:4]==person['event_sequence'][-1]['end_time'][:4]:
            if person['event_sequence'][0]['start_time'][5:7] == person['event_sequence'][-1]['end_time'][5:7]:
                if name['author'] !='0207':
                    listpeople.append(name['author'])
            elif (int(person['event_sequence'][-1]['end_time'][5:7])-int(person['event_sequence'][0]['start_time'][5:7]))== 1:
                listpeople.append(name['author'])
with open("peoplelist.txt", "w") as myfile:
    wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
    wr.writerow(listpeople)
