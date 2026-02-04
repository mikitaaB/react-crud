export enum TaskStatus {
    Todo = 'todo',
    InProgress = 'inProgress',
    Done = 'done',
}

export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Tag {
    id: string;
    name: string;
}
