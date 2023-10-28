import { TodoItem } from "./TodoItem";
import { SERVER_URL } from "./constants";

export async function getAllTodos() {
    const response = await fetch(SERVER_URL);
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();
    return json as TodoItem[];
}

export async function addNewTodo(newItem: TodoItem) {
    const response = await fetch(SERVER_URL, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();
    return json as TodoItem;
}

export async function deleteTodo(idItem: string) {
    const response = await fetch(`${SERVER_URL}/${idItem}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error(response.statusText);
}

export async function updateTodo(changedTodo: TodoItem) {
    const response = await fetch(`${SERVER_URL}/${changedTodo.id}`, {
        method: "PUT",
        body: JSON.stringify(changedTodo),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();
    return json as TodoItem;
}
