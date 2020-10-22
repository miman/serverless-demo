import { DynamoDB } from 'aws-sdk';
import { Task } from '../api/TaskApi';
import { TaskEntity } from './TaskEntity';

/**
 * This is a repository class for the Tasks table
 * Primary Key = UserId
 * Sort Key = Created time as ISO String
 */
class TasksRepo {
  /**
   * The Dynamo DB
   */
  dynamoDb: DynamoDB.DocumentClient = null;
  tableName = process.env.TasksDbName;

  constructor() {
    console.log('tasksRepo created');
    this.dynamoDb = new DynamoDB.DocumentClient({ region: 'eu-west-1' });
  }

  public storeTask(task: Task): Promise<boolean> {
    let entity: TaskEntity = {
      primarykey: task.userId,
      sortkey: task.createdTime,
      entity: task
    }
    let input: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: entity,
    };
    return this.dynamoDb.put(input).promise()
      .then((data: DynamoDB.DocumentClient.PutItemOutput) => {
        console.log('Stored the task data: ' + JSON.stringify(data));
        return true;
      })
      .catch((err) => {
        console.log('Failed to store the task data: ' + err);
        return false;
      });
  }

  /**
   * Read the statiscs data for the msg with the given correlationId
   */
  public readAllTasks(userId: string): Promise<TaskEntity[]> {
    console.log('Reading task for userId: ' + userId);
    let input: DynamoDB.DocumentClient.QueryInput = {
      TableName: this.tableName,
      KeyConditionExpression: "primarykey = :pk",
      ExpressionAttributeValues: {
        ":pk": userId
      }
    };
    return this.dynamoDb.query(input).promise()
      .then((result: DynamoDB.QueryOutput) => {
        console.log('Read tasks output: ' + JSON.stringify(result));
        return result.Items as unknown as TaskEntity[];
      })
      .catch((err) => {
        console.log('Failed to read the tasks data: ' + err);
        return undefined;
      });
  }
}

export const tasksRepo = new TasksRepo();
