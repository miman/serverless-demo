import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { Task } from '../api/TaskApi';
import { tasksRepo } from '../db/statistics-repo';
import { TaskEntity } from '../db/TaskEntity';

/**
 * Handles the received msg.
 * This is done by using the data in the header to post the msg to the correct AWS IoT Topic
   * @return  A promise, while this is a long running task
 */
class GetTasksHandler {
  constructor() {
    console.log('GetTasksHandler created');
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
  public async handleGetTasksRequest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(">> getTasks");
    // let sk: string = "2020-10-22T06:38:29.413Z";
    let userId: string = event.queryStringParameters["userId"];
    let dbPromise: Promise<TaskEntity[]> = tasksRepo.readAllTasks(userId);

    return dbPromise.then((reply: TaskEntity[]) => {
      console.log("Reply: " + JSON.stringify(reply));
      let response: Task[] = [];
      reply.forEach((elem: TaskEntity) => {
        response.push(elem.entity);
      });
      return {
        statusCode: 200,
        body: JSON.stringify(response, null, 2),
      };
    }).catch((err) => {
      return {
        statusCode: 500,
        body: JSON.stringify(err, null, 2),
      };
    });
  }
}

export const getTasksHandler = new GetTasksHandler();
