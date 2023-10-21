import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { TodoItem } from './TodoItem'

interface Todos {
    todos: TodoItem[],
    isAddingDisabled: boolean,
    setAddingDisabled: (newValue: boolean) => void,
    createEmptyTodo: () => void,
    addTodo: (newItem: TodoItem) => void,
    saveChanges: (changedTodo: TodoItem) => void,
    deleteTodo: (todo: TodoItem) => void
}

export const useTodos = create<Todos>()(set => ({
    todos: [
        {
            id: '1',
            level: 'MEDIUM',
            completed: false,
            state: 'default'
        }],
    isAddingDisabled: false,
    setAddingDisabled: (newValue: boolean) => set(() => {
        return {
            isAddingDisabled: newValue
    }}),
    createEmptyTodo: () => set(state => {
        
        const newTodo = {id: nanoid(), level: 'Medium', completed: false, state: 'create'}
        return {
            todos: [newTodo, ...state.todos],
            isAddingDisabled: true
    }}),
    addTodo: (newItem: TodoItem) => set(state => {
        return {
            // отправка на сервер
    }}),
    saveChanges: (changedTodo: TodoItem) => set(state => {
        const oldTodo = state.todos.filter(item => item.id === changedTodo.id)[0]
        const index = state.todos.indexOf(oldTodo)
        const newTodos = [...state.todos]
        newTodos.splice(index, 1, changedTodo)
        return {
            todos: [...newTodos]
        }
    }),
    deleteTodo: (todo: TodoItem) => set(state => {
        const newTodos = state.todos.filter(item => item.id !== todo.id)
        return {
            todos: [...newTodos]
        }
    })
}))