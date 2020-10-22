import { Context } from 'aws-lambda';
import { SQS } from 'aws-sdk';
import 'source-map-support/register';
import { Task, TaskWithTopic } from '../api/TaskApi';
import { tasksRepo } from '../db/statistics-repo';
import { sendMsgOnSqs } from '../util/sqs-sender';

class TaskStatusEventHandler {
  constructor() {
    console.log('TaskStatusEventHandler created');
  }

  public async handleEvent(event: TaskWithTopic, _context: Context): Promise<any> {
    console.log(">> handleEvent from topic: " + event.topic);
    event.status = "Handled";
    event.topic = undefined;
    let task: Task = event;
    let dbPromise: Promise<boolean> = tasksRepo.storeTask(task);

    let sqsPromise: Promise<SQS.SendMessageResult> = sendMsgOnSqs(JSON.stringify(task), process.env.NotificationQueueURL);

    let allPromises: Promise<[boolean, SQS.SendMessageResult]> = Promise.all([dbPromise, sqsPromise]);

    return allPromises.then((reply) => {
      let dbResponse: boolean = reply[0];
      let sqsResponse: SQS.SendMessageResult = reply[1];
      console.log("Db response: " + JSON.stringify(dbResponse));
      console.log("SQS response: " + JSON.stringify(JSON.stringify(sqsResponse)));
      return {
        statusCode: 200,
        body: "operation status: " + reply,
      };
    }).catch((err) => {
      return {
        statusCode: 500,
        body: JSON.stringify(err, null, 2),
      };
    });
  }
}

export const taskStatusEventHandler = new TaskStatusEventHandler();
