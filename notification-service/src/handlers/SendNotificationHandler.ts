import { SQSEvent } from 'aws-lambda';
import 'source-map-support/register';
import { Task } from '../api/TaskApi';
import { smsSender } from '../util/sms-sender';

class SendNotificationHandler {
  constructor() {
    console.log('SendNotificationHandler created');
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

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'handleSendNotificationRequest execution failed!',
      }, null, 2),
    };
  }
}

export const sendNotificationHandler = new SendNotificationHandler();
