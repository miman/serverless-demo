import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Task } from './api/TaskApi';
import { mqttSender } from './mqtt/mqtt-sender';

export const storeTask: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  console.log(">> storeTask: " + event.body);
  let task: Task = JSON.parse(event.body);
  let topic = process.env.TaskTopicName.replace("{vehicleId}", "VIN_1234567890");

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
      statusCode: 200,
      body: JSON.stringify({
        message: 'StoreTask executed successfully!',
        inputBody: event.body,
      }, null, 2),
    };
  });
}

export const getTasks: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  console.log(">> getTasks: " + event.path);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'GetTasks executed successfully!',
    }, null, 2),
  };
}
