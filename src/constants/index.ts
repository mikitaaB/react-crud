import { TaskPriority, TaskStatus } from "../types/task";

export const STATUSES: Record<TaskStatus, string> = {
    todo: "To do",
    inProgress: "In Progress",
    done: "Done",
};

export const PRIORITIES: Record<TaskPriority, string> = {
    Low: "Low",
    Medium: "Medium",
    High: "High",
};
