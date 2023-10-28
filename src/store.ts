import { create } from "zustand";
import { nanoid } from "nanoid";
import { TodoItem } from "./TodoItem";
import {
    addNewTodo,
    deleteTodo,
    getAllTodos,
    updateTodo,
} from "./serverMethods";
import { TodoState } from "./constants";

interface Todos {
    todos: TodoItem[];
    newTodoId: string | undefined;
    createEmptyTodo: () => void;
    replaceTodo: (changedTodo: TodoItem, stateTodo: TodoState) => void;
    deleteTodo: (todo: TodoItem) => void;
    searchText: string;
    setSearchText: (newText: string) => void;
    fetchTodos: () => void;
}

export const useTodos = create<Todos>()((set) => ({
    todos: [],
    newTodoId: undefined,
    searchText: "",
    fetchTodos: async () => {
        const response = await getAllTodos();
        set({
            todos: response,
        });
    },
    setSearchText: (newText: string) =>
        set(() => {
            return {
                searchText: newText,
            };
        }),

    createEmptyTodo: () =>
        set((state) => {
            getAllTodos();
            const newTodo: TodoItem = {
                id: nanoid(),
                level: "MEDIUM",
                completed: false,
                title: "",
                body: "",
            };

            return {
                newTodoId: newTodo.id,
                searchText: "",
                todos: [newTodo, ...state.todos],
                isAddingDisabled: true,
            };
        }),

    replaceTodo: async (changedTodo: TodoItem, stateTodo: TodoState) => {
        const response = await (stateTodo === "create"
            ? addNewTodo(changedTodo)
            : updateTodo(changedTodo));

        set((state) => {
            const newTodos = state.todos.map((item) =>
                item.id === response.id ? response : item
            );

            return {
                newTodoId: stateTodo === "create" ? undefined : state.newTodoId,
                todos: newTodos,
            };
        });
    },
    deleteTodo: (todo: TodoItem) =>
        set((state) => {
            const newTodos = state.todos.filter((item) => item.id !== todo.id);
            deleteTodo(todo.id);
            return {
                todos: [...newTodos],
            };
        }),
}));
