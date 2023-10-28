import { TodoItem } from "./TodoItem";
import { levelByImportance } from "./constants";

export function compareNotes(
    elem1: TodoItem,
    elem2: TodoItem,
    newTodoId: string | undefined = undefined
) {
    if (newTodoId === elem1.id) {
        return -1;
    }
    if (newTodoId === elem2.id) {
        return 1;
    }
    if (elem1.completed === elem2.completed) {
        return (
            levelByImportance.indexOf(elem2.level) -
            levelByImportance.indexOf(elem1.level)
        );
    }
    return elem1.completed ? 1 : -1;
}
