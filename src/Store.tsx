import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { TodoItem } from './TodoItem'

interface Todos {
    todos: TodoItem[],
    isAddingDisabled: boolean,
    setAddingDisabled: (newValue: boolean) => void,
    isEditingDisabled: boolean,
    setEditingDisabled: (newValue: boolean) => void,
    createTodo: () => void,
    saveChanges: (changedTodo: TodoItem) => void,
    deleteTodo: (todo: TodoItem) => void
}

export const useTodos = create<Todos>()(set => ({
    todos: [
        {
            id: '1',
            level: 'MEDIUM',
            completed: false,
            isSaved: true
        }],
    isAddingDisabled: false,
    setAddingDisabled: (newValue: boolean) => set(() => {
        return {
            isAddingDisabled: newValue
    }}),
    isEditingDisabled: false,
    setEditingDisabled: (newValue: boolean) => set(() => {
        return {
            isEditingDisabled: newValue
    }}),
    createTodo: () => set(state => {
        
        const newTodo = {id: nanoid(), level: 'MEDIUM', completed: false, isSaved: false}
        return {
            todos: [newTodo, ...state.todos],
            isEditingDisabled: true,
            isAddingDisabled: true
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