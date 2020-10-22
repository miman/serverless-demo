# Tips
This page describes some nice tips when working with serverless.com

## Accessing data from the config file
To access data from the config file your can use ***process.env***, in the example below we get the **NotificationBucketName** string from the serverless.ts file in any code file

```
process.env.NotificationBucketName
```

[Main page](../README.md)