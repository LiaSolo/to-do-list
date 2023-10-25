import { TodoItem } from "./TodoItem";


function preCompare(elem:TodoItem) {
    const completed = elem.completed
    const level = elem.level
    if (completed === false && level === 'CRITICAL') {
        return 10
    }
    if (completed === false && level === 'MEDIUM') {
        return 8
    }
    if (completed === false && level === 'LOW') {
        return 6
    }
    if (completed === true && level === 'CRITICAL') {
        return -6
    }
    if (completed === true && level === 'MEDIUM') {
        return -8
    }
    if (completed === true && level === 'LOW') {
        return -10
    }
    return 0
}

export function compareNotes(elem1:TodoItem, elem2: TodoItem) {
    return preCompare(elem2) - preCompare(elem1)
}