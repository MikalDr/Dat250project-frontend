import requests

# Simple python program to simulate a IoT device by using the keys 1-4 and enter.

# Token that the owner of a poll can generate from my-topics
iotToken = input("IoT token: ")

tokenParam = {"token": iotToken}
url = "http://localhost:8080/api/iot"

# Do a get request to get the vote options
pollRequest = requests.get(url, params=tokenParam)
if pollRequest.status_code == 200:
    pollJson = pollRequest.json()

    # extract voteOptions + add voteCount to json
    body = pollJson["topic"]["voteOptions"]
    for option in body:
        option["voteCount"] = 0

    optionIndex = 0
    send = False
    while (not send):
        print("\nCurrent vote option: " + body[optionIndex]["label"])

        keyInput = input("1: vote \n2: cycle \n3: send \n4: reset\n:")
        if (keyInput == "1"):
            body[optionIndex]["voteCount"] += 1

        elif (keyInput == "2"):
            if optionIndex < len(body)-1:
                optionIndex += 1
            else:
                optionIndex = 0

        elif keyInput == "3":
            send = True

        elif keyInput == "4":
            body = pollJson["topic"]["voteOptions"]
            for option in body:
                option["voteCount"] = 0

        else:
            print("Invalid input")

    print(body)
    headers = {
        #'Authorization': token,
        "Content-Type": "application/json"
    }
    response = requests.put(url, json=body, headers=headers, params=tokenParam)
    if response.status_code == 200:
        print("PUT request was successful")
        print(response)
    else:
        print("PUT request failed")
        print(response)
else:
    print("Could not get poll using IoT token")
    print(pollRequest)
