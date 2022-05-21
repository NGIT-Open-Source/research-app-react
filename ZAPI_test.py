# import requests

# resp = requests.post("http://localhost:3000/api/auth", json={
#     "email": "example5@example.com",
#     'password': "bacon"
# })
# print(resp.text, resp.status_code)

for _ in range(int(input())):
    n = int(input())
    arth = input()
    count = 1

    fin = arth.count("r") + arth.count("c") + arth.count("l") + arth.count("g")
    print(fin, arth.count('c'), )
    if fin == 0:
        print(1)
    else:
        print((2**fin) % (10**9 + 7))
