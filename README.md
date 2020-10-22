# serverless-demo
Project demoing howto work with serverless.com tool together with AWS using Typescript

It examplifies the useage of the following infrastructure tools:
* Store & Query DynamoDb
* Send & receive on SQS
* Send & receive on MQTT (AWS IoT)
* Send on SNS
* Triggering Lambda from HTTP call
* Storing to S3

## Overview
![Overview](http://www.plantuml.com/plantuml/png/bLHDRzim3BtdLt0vR1dGmeVUYg5ecWnTWBLRuHGxApRZ2BMbLAGJ5CF--oH6JXtNNh4SOfDyZn_Yaw-9bUEwAaVWVn-qoSewH_YYzbJgLJBzbSviLLbpDHB09tWqcNUWOU0DmjgMfTrhKq2f3G9Ro1mgHY1TRKkzrfZ3JkD-C7jwn4c57j0j6dIgJ1u97LtrO-xiIfUOJ7ykRXNZNhqCu5BCQgVvPP6ZOV-ScdncGmFAP9ZCR64qsm5k0DQCoNTLhN8r09ehLYj5cCnVZAhi_6O0jp2CpY3_M2ytsXIKBEnoPXqEmATRtsEcM5iJc8MJroHzIF-JS3z4IDawLM0Y-y1efUXsEiFq8kwcn3M77JjTR1XoxJ0BQG_1hSgUF0V6IqLF4AbZ-2t1y7lTpkGWaW2SRlKPZ6TYWp0zR7nq4IXWxnr_FgOvd7yhnJTbyXBTaIC4s1oy8HNvQP14hnBw28Gc9z0oJ73xGL3lq0MGNqUhMhF7IM3ELsTnl6RFu-WWK4IwC9Y7b3MXypdw9Y-G1N-O-nOPn6ocVZjdGuXJHX8BASuOYLrcmAIikAQlEpGS4pGJa4G0GwYJgCaJDJdHbiFJ1-yUbiiMw4zdy_UMzJhAhay1iJ7JWgLeSdIllGKRsdc6XlJQdz0pFTHOurcdT5KuU0w1pa3flUSOMjgjpffQwLqAukWMwBy94xgugRCdP8-MOuM3-VPKv7irgSD_WwM0gdHPQci8x1easXGL0yxFh-3aUaZin1Cn7Vr7NCShs8Ds_m686xw4S2G23pAMJrEtjvQ09TAoJ-8n_GccfoU9n_BYxrVj9RH5MszpnHYe0_1MXKju5BIOxr4QGSM3Q0jLEZq213seOu4EHeNRo31MKXI4-1uljtiJk562dilMORp3A_JR0lAlez6rvzLL-HS0)

# Usage

## Prereqs
You ***MUST*** create a file in the project root called ***"props.json"*** containing:

```
{
    "profile": "Your profile id for your AWS account",
    "AWS_ACCOUNT_ID": "The AWS account id you are working in"
}
```
Obviously replace the actual values with your info

### profile
The profile is that name from the **C:\Users\YourName\.aws\credentials** file, ***traf*** in the example below
```
[traf]
aws_access_key_id = MyAccessKey348217493e
aws_secret_access_key = TheSecretKey4832649836432y2
```

## Build using:
npm install

## Test using
npm test

## Deploy to AWS
```
serverless deploy
```

or if serverless isn't installed globally
```
npx serverless deploy
```


## Remove from AWS
```
serverless remove
```
or if serverless isn't installed globally
```
npx serverless remove
```

# Classes

## Event listener
This is done in the handler.ts file

# Frameworks
These are the technologies used in this project

## Deployment
serverless.com is used for AWS configuration & deployment

This is all configured in the serverless.ts file

## Dev language
Typescript is used as the main language, this is compiled into Javascript to be run in a nodejs environment

# Test
Test classes are located under the **test** folder.
