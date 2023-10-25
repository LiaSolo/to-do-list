import menuStyles from './Menu.module.scss'
import { FC } from 'react'
import { TodoItem } from '../../TodoItem'
import { useTodos } from '../../Store'
import Buttons from '../Buttons/Buttons'

interface Props {
    item: TodoItem;
    setShowMenu: (newValue: boolean) => void;
}

const Menu: FC<Props> = ({ item, setShowMenu }) => {
    const saveChanges = useTodos(state => state.saveChanges)
    const deleteTodo = useTodos(state => state.deleteTodo)

    const handleCompleteClick = () => {
        const completedItem = {
            id: item.id,
            level: item.level,
            completed: true,
            title: item.title,
            body: item.body,
            state: 'default'
        }
        setShowMenu(false)
        saveChanges(completedItem)
    }

    const handleEditClick = () => {
        const unsavedItem = {
            id: item.id,
            level: item.level,
            completed: item.completed,
            title: item.title,
            body: item.body,
            state: 'edit'
        }
        setShowMenu(false)
        saveChanges(unsavedItem)
    }

    const handleDeleteClick = () => {
        setShowMenu(false)
        deleteTodo(item)
    }    

    return(
        <div className={menuStyles.Menu}>
            <div className={menuStyles.btnsContainer}>
                <Buttons 
                    btnColor='#73A584' 
                    hasIcon={true} 
                    icon='done'
                    iconSize='16px' 
                    text='COMPLETE'
                    onClick={handleCompleteClick}
                />
                <Buttons 
                    btnColor='#395B64' 
                    hasIcon={true} 
                    icon='edit'
                    iconSize='16px' 
                    text='EDIT'
                    onClick={handleEditClick}
                />
                <Buttons 
                    btnColor='#D57575' 
                    hasIcon={true} 
                    icon='delete'
                    iconSize='16px' 
                    text='DELETE'
                    onClick={handleDeleteClick}
                />
            </div>
            
        </div>
    )
}

export default Menu