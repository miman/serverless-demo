import { Handler, SQSEvent } from 'aws-lambda';
import 'source-map-support/register';
import { sendNotificationHandler } from './handlers/SendNotificationHandler';

export const handleSendNotification: Handler = async (event: SQSEvent, _context) => {
  console.log('SQS msg received: ' + JSON.stringify(event));

  // We only process one message, while we configured in the serverless.yml file that we only handle one msg at a time
  if (event.Records.length > 0) {
    return sendNotificationHandler.handleSendNotificationRequest(event);
  } else {
    return {
      statusCode: 200,
      body: "Ok",
    };
  }
}
