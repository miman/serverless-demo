import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Task } from './api/TaskApi';
import { tasksRepo } from './db/statistics-repo';
import { TaskEntity } from './db/TaskEntity';
import { mqttSender } from './mqtt/mqtt-sender';

export const storeTask: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  console.log(">> storeTask: " + event.body);
  let task: Task = JSON.parse(event.body);
  task.createdTime = new Date().toISOString();
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

export const getTasks: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
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
