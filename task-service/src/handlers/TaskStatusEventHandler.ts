import { Context } from 'aws-lambda';
import 'source-map-support/register';
import { Task, TaskWithTopic } from '../api/TaskApi';
import { tasksRepo } from '../db/statistics-repo';

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

    return dbPromise.then((reply: boolean) => {
      console.log("Reply: " + JSON.stringify(reply));
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
