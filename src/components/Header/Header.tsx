import styles from './Header.module.scss'
import { FC } from 'react'
import { useTodos } from '../../Store';
import Buttons from '../Buttons/Buttons';

const Header: FC = () => {
    const createEmptyTodo = useTodos(s => s.createEmptyTodo)
    const isAddingDisabled = useTodos(s => s.isAddingDisabled)
    const handleAddNoteClick = () => {
        createEmptyTodo()
    }
    return (
        <div className={styles.Header}>
          <span>Yet Another Todo List</span>
          <form  action='' method='get'>
            <input 
              type='search'
              placeholder='Search me Daddy...'
              disabled={isAddingDisabled}
              className={styles.searchBox}>
          </input>
          </form>
          
          <Buttons 
            isDisabled={isAddingDisabled}
            hasPadding='0px'
            btnWidth='35px' 
            hasIcon={true} 
            icon='add' 
            iconSize='24px' 
            text='' 
            btnColor='#395B64'
            onClick={handleAddNoteClick}
          />
        </div>
    )
}

export default Header