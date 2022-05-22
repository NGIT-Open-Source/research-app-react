import json
import requests

from pymongo import MongoClient
client = MongoClient(
    'mongodb+srv://geneticsapp:genetics_app@cluster0.qmsu1.mongodb.net/?retryWrites=true&w=majority')

# input()
resp = requests.get("https://dummyapi.io/data/v1/user?limit=100", headers={
    'app-id': '628a3da34aea2e94659a1c09'
})
# with open('json.json', 'w', encoding='utf-8') as f:
# f.write(resp.text["data"])
data = json.loads(resp.text)
print(data['data'], resp.status_code)
lis = []
print(len(data['data']))
# input()
for i in data['data']:
    dat = {
        "_id": i['id'] + 'pingg',
        'Hospital': i['firstName'] + "Uchiha",
        'Radiologist': i['firstName'][:3] + i['lastName'][:3] + '@' + 'jayahoo.com',
        'RadioEmail':  i['lastName'],
        'password': i['picture'],
        'Location': i['picture'][::-1][:12]
    }
    lis.append(dat)
    try:
        client['test']['subjects'].insert_one(dat)
        print("k")
    except Exception as e:
        print(e)
        # input()
        continue

# for _ in range(int(input())):
#     n = int(input())
#     arth = input()
#     count = 1

#     fin = arth.count("r") + arth.count("c") + arth.count("l") + arth.count("g")
#     print(fin, arth.count('c'), )
#     if fin == 0:
#         print(1)
#     else:
#         print((2**fin) % (10**9 + 7))
