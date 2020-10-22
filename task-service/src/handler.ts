import { Handler, Context, APIGatewayProxyEvent, APIGatewayProxyHandler, Callback } from 'aws-lambda';
import 'source-map-support/register';
import { TaskWithTopic } from './api/TaskApi';
import { createTaskHandler } from './handlers/CreateTaskHandler';
import { getTasksHandler } from './handlers/GetTasksHandler';
import { taskStatusEventHandler } from './handlers/TaskStatusEventHandler';

export const storeTask: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  return createTaskHandler.handleCreateTaskRequest(event);
}

export const getTasks: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  return getTasksHandler.handleGetTasksRequest(event);
}

/**
 * AWS Lambda handler, used to test the following:
 * - Listening to a AWS IoT Topic
 * - Transform to internal format
 * - Forward the received msg to an AWS SQS Queue
 * 
 *  Received event MUST be formatted according to VapiMsg
 * 
 * @param event AWS Lambda Event
 * @param context AWS Lambda context
 * @param callback AWS Lambda callback
 */
export const handleTaskStatusEvent: Handler = async (event: TaskWithTopic, context: Context, _callback: Callback) => {
  console.log('IoT Message received: ' + JSON.stringify(event));
  console.log('AWS request Id: ' + context.awsRequestId);
  return taskStatusEventHandler.handleEvent(event, context);
}

