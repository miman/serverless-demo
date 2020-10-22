import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { createTaskHandler } from './handlers/CreateTaskHandler';
import { getTasksHandler } from './handlers/GetTasksHandler';

export const storeTask: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  return createTaskHandler.handleCreateTaskRequest(event);
}

export const getTasks: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  return getTasksHandler.handleGetTasksRequest(event);
}
