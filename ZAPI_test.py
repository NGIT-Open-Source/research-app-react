# import json
# import requests

# from pymongo import MongoClient
# client = MongoClient(
#     '****')

# # input()
# resp = requests.get("https://dummyapi.io/data/v1/user?limit=100", headers={
#     'app-id': '*********'
# })
# # with open('json.json', 'w', encoding='utf-8') as f:
# # f.write(resp.text["data"])
# data = json.loads(resp.text)
# # print(data['data'], )
# # lis = []
# # print(len(data['data']))
# # input()
# for i in data['data']:
#     dat = {
#         "_id": i['id'],
#         'Hospital': i['firstName'],
#         'Radiologist': i['firstName'][:3] + i['lastName'][:3] + '@' + 'jayahoo.com',
#         'RadioEmail':  i['lastName'],
#         'password': i['picture'],
#         'Location': i['picture'][::-1][:12]
#     }
#     # lis.append(dat)
#     print(dat)
#     print(',')

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
import requests
resp = requests.get('http://localhost:3000/api/edit-delSubject', headers={
    'api-key': "MELON_LUSK"
})
print(resp.text)
