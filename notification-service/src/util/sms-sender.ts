/**
 * This file contanis a class that sends the given message as an SMS (over SNS) to the supplied mobile phone number
 */
import { SNS } from 'aws-sdk';

// Set region
// AWS.config.update({ region: 'eu-west-1' });

/**
 * A class that sends the given message as an SMS (over SNS) to the supplied mobile phone number
 */
class SmsSender {

  constructor() {
    console.log('SmsSender created');
  }

  /**
   * Function to send a message to an SQS queue
   * @param msg msg to send
   * @param qURL  The URL to the SQS to send to
   */
  public sendSms(msg: string, phoneNo: string): Promise<boolean> {
    console.log("Sending SMS over SNS, msg: " + msg);
    // Create publish parameters
    var params: SNS.PublishInput = {
      Message: msg, /* required */
      PhoneNumber: phoneNo,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          'DataType': 'String',
          'StringValue': 'VgcsIotPoc'
        }
      }
    };

    // Create promise and SNS service object
    var publishTextPromise: Promise<SNS.PublishResponse> = new SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    return publishTextPromise.then((data: SNS.PublishResponse) => {
      console.log("SMS sent ok to SNS queue, MessageID is " + data.MessageId);
      return true;
    }).catch((err) => {
      console.error("Failed to send SMS over SNS", err, err.stack);
      return false;
    });
  }
}

export const smsSender = new SmsSender();



