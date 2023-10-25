import { TodoItem } from "./TodoItem";
import { levelByImportance } from "./constants";

export function compareNotes(elem1: TodoItem, elem2: TodoItem) {
    if (elem1.completed === elem2.completed) {
        return (
            levelByImportance.indexOf(elem2.level) -
            levelByImportance.indexOf(elem1.level)
        );
    } else if (elem1.completed) {
        return 10;
    } else {
        return -10;
    }
}
