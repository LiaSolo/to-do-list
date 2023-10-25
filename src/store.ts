import { create } from "zustand";
import { nanoid } from "nanoid";
import { TodoItem } from "./TodoItem";
import { compareNotes } from "./compareNotes";
import { TodoState } from "./constants";

interface Todos {
    todos: TodoItem[];
    isAddingDisabled: boolean;
    setAddingDisabled: (newValue: boolean) => void;
    createEmptyTodo: () => void;
    addTodo: (newItem: TodoItem) => void;
    replaceTodo: (changedTodo: TodoItem) => void;
    deleteTodo: (todo: TodoItem) => void;
    editState: (item: TodoItem, newState: TodoState) => void
}

export const useTodos = create<Todos>()((set) => ({
    todos: [
        {
            id: "1",
            level: "MEDIUM",
            completed: false,
            title: "Title123",
            body: "Body123",
            state: "default",
        },
    ],
    isAddingDisabled: false,
    setAddingDisabled: (newValue: boolean) =>
        set(() => {
            return {
                isAddingDisabled: newValue,
            };
        }),
    createEmptyTodo: () =>
        set((state) => {
            const newTodo: TodoItem = {
                id: nanoid(),
                level: "MEDIUM",
                completed: false,
                title: "",
                body: "",
                state: "create",
            };
            return {
                todos: [newTodo, ...state.todos],
                isAddingDisabled: true,
            };
        }),
    addTodo: (newItem: TodoItem) =>
        set((state) => {
            return {
                // отправка на сервер
            };
        }),

    editState: (item: TodoItem, newState: TodoState) => set( state => {
        const index = state.todos.indexOf(item);
        const newItem: TodoItem = {
            id: item.id,
            level: item.level,
            completed: item.completed,
            title: item.title,
            body: item.body,
            state: newState,
        }
        const newTodos = [...state.todos];
            newTodos.splice(index, 1, newItem);
            newTodos.sort(compareNotes);
        return {
                todos: [...newTodos],
            };
    }),
    replaceTodo: (changedTodo: TodoItem) =>
        set((state) => {
            const oldTodo = state.todos.filter(
                (item) => item.id === changedTodo.id
            )[0];
            const index = state.todos.indexOf(oldTodo);
            const newTodos = [...state.todos];
            newTodos.splice(index, 1, changedTodo);
            newTodos.sort(compareNotes);
            return {
                todos: [...newTodos],
            };
        }),
    deleteTodo: (todo: TodoItem) =>
        set((state) => {
            const newTodos = state.todos.filter((item) => item.id !== todo.id);
            return {
                todos: [...newTodos],
            };
        }),
}));
