
export class Task {
    id?: string;
    name: string;
    userId?: string;
    createdTime?: string;
    completedTime?: string;
    description?: string;
    status?: string;
    phoneNo?: string;
}

export class TaskWithTopic extends Task {
    topic?: string;
}