import styles from './TodoList.module.scss'
import { FC } from 'react'
import { useTodos } from '../../store'
import Note from '../Note/Note'

const TodoList: FC = () => {
    const todos = useTodos(state => state.todos)
    return (
        <div className={styles.TodoList}>
            <div className={styles.notesContainer}>
               {todos && todos.map((item) => (
                    <Note 
                        key={item.id} 
                        item={item}
                    />
                ))} 
            </div>
            
        </div>

    )
}

export default TodoList