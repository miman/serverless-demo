import { SQSEvent } from 'aws-lambda';
import 'source-map-support/register';

class SendNotificationHandler {
  constructor() {
    console.log('SendNotificationHandler created');
  }

  public async handleSendNotificationRequest(event: SQSEvent): Promise<any> {
    let receivedMsg: any = JSON.parse(event.Records[0].body);
    console.log(">> handleSendNotificationRequest: " + JSON.stringify(receivedMsg));

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'handleSendNotificationRequest execution failed!',
      }, null, 2),
    };
  }
}

export const sendNotificationHandler = new SendNotificationHandler();
