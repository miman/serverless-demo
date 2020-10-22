import { AWSError, SQS } from 'aws-sdk';

let sqs = new SQS({ apiVersion: '2012-11-05' });

/**
 * Function to send a message to an SQS queue
 * @param msg msg to send
 * @param qURL  The URL to the SQS to send to
 * @returns A promise to send the msg on SQS
 */
export function sendMsgOnSqs(msg: string, qURL: string): Promise<SQS.SendMessageResult> {
    const sendParams = {
      MessageBody: msg,
      QueueUrl: qURL
    };
    console.log("Sending msg on SQS topic '" + qURL + "', msg: " + msg);
    return sqs.sendMessage(sendParams).promise().then((data: SQS.SendMessageResult) => {
      let response = null;
  
      console.log('IoT Success: ' + JSON.stringify(data));

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: data.MessageId
        })
      };
      return response;
    }).catch((err: AWSError) => {
      let response = null;
      console.log("Error: ", "Fail send msg: " + err);
        response = {
          statusCode: 500,
          body: JSON.stringify({
            message: 'ERROR'
          })
        };
        return response;
    });
  }
