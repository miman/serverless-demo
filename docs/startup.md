# Startup
This page describes the pre-requisites for what you need to do before creating a project and how to create the project and do an initial setup

# Pre-requisites
First we need to fetch the AWS credentials and setup serverless to use these

A good tutorial for howto do this can be found here:
https://www.jamestharpe.com/serverless-typescript-getting-started/

## profile
The AWS profile you will refer to from the serverless config file is that name from the **C:\Users\YourName\.aws\credentials** file, ***myAwsAccount*** in the example below
```
[myAwsAccount]
aws_access_key_id = MyAccessKey348217493e
aws_secret_access_key = TheSecretKey4832649836432y2
```


## Separating Profile & account info from serverless config file
In our example code we have choosen to separate the Profile & account info from serverless config file, so we don't need to have these in the git repo, so for this specific project you MUST do the following:

You ***MUST*** create a file in the project root called ***"props.json"*** containing:

```
{
    "profile": "Your profile id for your AWS account",
    "AWS_ACCOUNT_ID": "The AWS account id you are working in"
}
```
Obviously replace the actual values with your info

# Using company Proxy
If you run into proxy issues when using npm you may want to set the proxy:

```
npm config
npm config set https-proxy http://yourproxy.comp.com:8080
```

Next step> [Create project](./create-prj.md)