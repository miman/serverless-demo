import { SQSEvent } from 'aws-lambda';
import { AWSError, S3 } from 'aws-sdk';
import 'source-map-support/register';
import { Task } from '../api/TaskApi';
import { smsSender } from '../util/sms-sender';

class SendNotificationHandler {
  s3: S3;
  constructor() {
    console.log('SendNotificationHandler created');
    this.s3 = new S3();
    this.handleSendNotificationRequest = this.handleSendNotificationRequest.bind(this);
  }

  public async handleSendNotificationRequest(event: SQSEvent): Promise<any> {
    let task: Task = JSON.parse(event.Records[0].body);
    console.log(">> handleSendNotificationRequest: " + JSON.stringify(task));

    if (task.phoneNo) {
      // Send an SMS to the phone
      let snsPromise: Promise<boolean> = smsSender.sendSms(task.name, task.phoneNo);
      await snsPromise.then((reply: boolean) => {
        console.log("Sending SMS " + reply?"succeeded":"failed");
      });
    }

    // Store task to S3
    let s3Req: S3.PutObjectRequest = {
      Bucket: process.env.NotificationBucketName,
      Key: task.id + ".json",
      Body: JSON.stringify(task),
    }
    let s3Promise: Promise<S3.PutObjectOutput> = this.s3.putObject(s3Req).promise();

    return s3Promise.then((data: S3.PutObjectOutput) => {
      console.log('Data stored Ok: ' + JSON.stringify(data));
      return new Promise(() => {
        return {
          statusCode: 200
        };

      }).catch((err: AWSError) => {
        console.log('Failed to store the data: ' + JSON.stringify(err));
        return new Promise(() => {
          return {
            statusCode: 200
          };
        })
      })
    });
  }
}

export const sendNotificationHandler = new SendNotificationHandler();
