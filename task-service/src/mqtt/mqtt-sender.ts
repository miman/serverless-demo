import { IotData } from 'aws-sdk';

// All message sent to/from devices connected to the IoT POC starts with this
// Our AWS IoT POC MQTT endpoint, unique per AWS account
const AWS_IOT_ENDPOINT = process.env.IotEndpoint;

/**
 * Handles the received msg.
 * This is done by using the data in the header to post the msg to the correct AWS IoT Topic
   * @return  A promise, while this is a long running task
 */
class MqttSender {
  /**
   * The IOT data channel on which we publishes msgs.
   */
  private iotdata: IotData = null;
  constructor() {
    console.log('MqttSender created');
    this.iotdata = new IotData({ endpoint: AWS_IOT_ENDPOINT });
  }

  /**
   * This function publishes the given message on the given MQTT topic
   * Code example is from:
   * - https://github.com/aws/aws-iot-device-sdk-js/issues/205
   * - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IotData.html#publish-property
   * 
   * @param msg The message to send
   * @param topicName On which topic to publish the message
   * @return  A promise, while this is a long running task
   */
  public postMsgToMqttTopic(msg: string, topicName: string): Promise<any> {
    console.log('Posting on topic: ' + topicName + ', VIOT-msg: ' + JSON.stringify(msg));

    var params = {
      topic: topicName,
      payload: msg,
      qos: 0
    };

    return this.iotdata.publish(params).promise();
  }
}

export const mqttSender = new MqttSender();
