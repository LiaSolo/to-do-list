import { TodoLevel } from "./constants";

export interface TodoItem {
    id: string;
    level: TodoLevel;
    title: string;
    body: string;
    completed: boolean;
}
