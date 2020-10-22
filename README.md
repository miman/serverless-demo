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
![Overview](http://www.plantuml.com/plantuml/png/bLHDRzim3BtdLt0vR1dGmeVUYg5ecWnTWBLRuHGxApRZ29MbLA8J5CF--oHQJXKtNh4SOfDyZn_YawyT2KjDhKRWVn-aBbHJ8dmHUwVaAfl-ocUches-6Z7W4ppgmZjG4z06OMsKCdkfAr1I8v21mg8W12VhhP9hYINi9Eu7i-S775Su0Rf5ZLQexD6XTLUdCNTc9HLcqv-BMq6u5oy3k1oBnafwMPIeoJ-dkfoPq83G1MOpKsb9Pe0RW0rXzbtKgr8CWEQ2n4eupEOlMjHcVZE0MsX2gv5-h9SRgIkNBSnoPYmEmATRtsCXI1eTc9Nbron_oF-JS3z4oCbOKM76-y1evMXtii3y8kv6uPh2ZgsiDWIbj5Y4j6rmAuedpu7nKhWdYDGn_EPW-BrkPzAA902dMta6undRm4mF6nzS3WIGzuu_7zAqvv-a-2PqgT0UE4o0JUiDgPoV1XthbKCVmQ4k7SWm3Blz82XtQ3qeh2Efrkrn4fZprLaShzlpE3eS2ETafR4CAHk7rkSuDNc5nFXsxbiaOBER-ksS7I5E6Kd4f3XZ9FQP0PEJeCPztQ6cBa6Sm744C8HwYReyKPCJQIWyVV3kORbCG7zwcxyt9DTHTdq598tf19QZBj6-zXPiIFCC3UcrFt7Fxg711izwfUlAmdC8z0RAxpr7kwNPogAhbT_bm8v-WTCtOU8kRfhY2ScZ-LYXDT-U2d-l9atuzp6s0gYMIacZ7PWrSB2hoGQSdr_1qUtWs94dOdhoZxYUbx6jTFy1Y0k-X70Y30ygvYzJlxT4lnn9xADuqbNVb_R4yLYU_QT5UmcfPfjjAGW3TG2ULBY4HqQp-HwbqrCyY5IdtEa1mEX16JDqCChSJeMnad11X-_nIhFNWHiLwBbaBCOhl4A_BN3-TJIwzhocLdy1)

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
