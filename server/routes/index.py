'''
    The RESTful style api server
'''
from flask import render_template
from flask import Flask, request, redirect, jsonify, send_from_directory,send_file
from server import app
from functools import wraps
import hashlib
import random
import time
import datetime
import os
import json
import requests
import subprocess
from math import sqrt
import pymongo
import pandas as pd
from server.routes.personalseq import dbfunc
dbfunction=dbfunc()

###### Global Parameters ########
dataPath = 'server/static/json/data.json'
rankPath = 'server/static/json/finalrank.json'
#################################

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/loadData', methods=['GET'])
def loadData():
    data = {}
    with open(dataPath, 'r') as f:
        data = json.load(f)
    return json.dumps(data)

@app.route('/loadRank')
def loadRank():
    data = {}
    with open(rankPath, 'r') as f:
        data = json.load(f)
    return json.dumps(data)

@app.route("/test", methods=['POST','GET'])
def register():
    print('hello world!')
    return 'get your request!'

@app.route("/data", methods=['POST','GET'])
def getdata():
    with open(dataPath, 'r') as f:
        data = json.load(f)
    return json.dumps(data)
    # print('get file successfully!')
    # return send_file("static/json/data.json")

@app.route("/jsondata", methods=['POST','GET'])
def getjsondata():
    fpath = 'server/static/csv/cluster.json'
    with open(fpath, 'r') as f:  
        data = json.load(f) 
    return json.dumps(data)

@app.route("/activity", methods=['POST','GET'])
def getactivity():
    fpath = 'server/static/csv/activity.json'
    with open(fpath, 'r') as f:  
        data = json.load(f)  
    return json.dumps(data)

@app.route("/circular", methods=['POST','GET'])
def getcircular():
    # print('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK!')
    return send_file("static/csv/circular.csv")
