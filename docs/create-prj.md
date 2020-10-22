# Create a project
This is a lazy list of commands to create a project if you don't want to read [this](https://www.jamestharpe.com/serverless-typescript-getting-started/) full tutorial:

```
serverless create --template aws-nodejs-typescript --path my-component

cd my-component

npm install
``` 

## Install core dependencies
Here we install some of the libraries that you must likely will need to use

```
npm install -S aws-sdk

npm install -D @types/aws-sdk @types/aws-lambda chai mocha @types/chai @types/mocha
```

## Update config file with correct region & AWS account being used
Set your project to use this profile by adding the following to the serverless.ts file:

```
provider: {
     profile: "myprj",
     region: "eu-west-1",
...
```
