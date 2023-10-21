import menuStyles from './Menu.module.scss'
import classNames from 'classnames'
import { FC } from 'react'
import { TodoItem } from '../../TodoItem'
import { useTodos } from '../../Store'

interface Props {
    item: TodoItem;
    setShowMenu: (newValue: boolean) => void;
}

const Menu: FC<Props> = ({ item, setShowMenu }) => {
    const saveChanges = useTodos(state => state.saveChanges)
    const deleteTodo = useTodos(state => state.deleteTodo)
    const btnIconComplete = classNames(menuStyles.btnIcons, menuStyles.iconComplete)
    const btnIconEdit = classNames(menuStyles.btnIcons, menuStyles.iconEdit)
    const btnIconDelete = classNames(menuStyles.btnIcons, menuStyles.iconDelete)
    const btnCompleteClass = classNames(menuStyles.buttons, menuStyles.btnComplete)
    const btnEditClass = classNames(menuStyles.buttons, menuStyles.btnEdit)
    const btnDeleteClass = classNames(menuStyles.buttons, menuStyles.btnDelete)

    const handleCompleteClick = () => {
        const completedItem = {
            id: item.id,
            level: item.level,
            completed: true,
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
                <div className={btnCompleteClass}
                onClick={handleCompleteClick}>
                    <div className={btnIconComplete}></div>
                    COMPLETE
                </div>

                <div className={btnEditClass}
                onClick={handleEditClick}>
                    <div className={btnIconEdit}></div>
                    EDIT
                </div>
                
                <div className={btnDeleteClass}
                onClick={handleDeleteClick}>
                    <div className={btnIconDelete}></div>
                    DELETE
                </div>
            </div>
            
        </div>
    )
}

export default Menu