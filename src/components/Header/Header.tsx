import styles from './Header.module.scss'
import { FC } from 'react'
import classNames from 'classnames'
import { useTodos } from '../../Store';

const Header: FC = () => {
    const createTodo = useTodos(s => s.createTodo)
    const isAddingDisabled = useTodos(s => s.isAddingDisabled)
    const btnAddNoteDisable = classNames(styles.btnAddNote, styles.disabled)
    const handleAddNoteClick = () => {
        createTodo()
    }
    return (
        <div className={styles.header}>
        <div className={styles.left}>
          <span>Yet Another Todo List</span>
          <input className={styles.searchBox} value='123'></input>
          {isAddingDisabled ? 
            <div className={btnAddNoteDisable}></div> : 
            <div className={styles.btnAddNote} onClick={handleAddNoteClick}></div>
          }
        </div>
      </div>
    )
}

export default Header