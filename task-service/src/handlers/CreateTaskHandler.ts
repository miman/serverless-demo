import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { Task } from '../api/TaskApi';
import { tasksRepo } from '../db/statistics-repo';
import { mqttSender } from '../mqtt/mqtt-sender';
import { v4 as uuid } from 'uuid';

/**
 * Handles the received msg.
 * This is done by using the data in the header to post the msg to the correct AWS IoT Topic
   * @return  A promise, while this is a long running task
 */
class CreateTaskHandler {
  constructor() {
    console.log('CreateTaskHandler created');
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
  public async handleCreateTaskRequest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(">> storeTask: " + event.body);
    let task: Task = JSON.parse(event.body);
    task.createdTime = new Date().toISOString();
    if (!task.id) {
      task.id = uuid();
    }
    
    if (!task.userId) {
      task.userId = "user_12345";
    }
    let topic = process.env.TaskTopicName.replace("{vehicleId}", "VIN_1234567890");

    let dbPromise: Promise<boolean> = tasksRepo.storeTask(task);
    await dbPromise.then((reply: boolean) => {
      if (!reply) {
        // We failed to store the task to db -> return error
        return {
          statusCode: 500,
          body: JSON.stringify({
            message: 'StoreTask execution failed!, could not be stored to Db',
            inputBody: event.body,
          }, null, 2),
        };
      }
    }).catch((err) => {
      // We failed to store the task to db -> return error
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'StoreTask execution failed!, could not be stored to Db',
          inputBody: event.body,
          error: err
        }, null, 2),
      };
    });
    let promise: Promise<any> = mqttSender.postMsgToMqttTopic(JSON.stringify(task), topic);

    return promise.then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'StoreTask executed successfully!',
          inputBody: event.body,
        }, null, 2),
      };
    }).catch((_err) => {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'StoreTask execution failed!',
          inputBody: event.body,
        }, null, 2),
      };
    });
  }
}

export const createTaskHandler = new CreateTaskHandler();
