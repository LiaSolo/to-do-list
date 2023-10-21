import styles from './Header.module.scss'
import { FC } from 'react'
import classNames from 'classnames'
import { useTodos } from '../../Store';

const Header: FC = () => {
    const createEmptyTodo = useTodos(s => s.createEmptyTodo)
    const isAddingDisabled = useTodos(s => s.isAddingDisabled)
    const btnAddNoteDisable = classNames(styles.btnAddNote, styles.disabled)
    const handleAddNoteClick = () => {
        createEmptyTodo()
    }
    return (
        <div className={styles.Header}>
          <text>Yet Another Todo List</text>
          <form  action='' method='get'>
            <input 
              type='search'
              placeholder='Search me Daddy...'
              disabled={isAddingDisabled}
              className={styles.searchBox}>
          </input>
          </form>
          
          {isAddingDisabled ? 
            <div className={btnAddNoteDisable}></div> : 
            <div className={styles.btnAddNote} onClick={handleAddNoteClick}></div>
          }
        </div>
    )
}

export default Header