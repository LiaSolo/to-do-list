import menuStyles from './Menu.module.scss'
import noteStyles from '../Note/Note.module.scss'
import classNames from 'classnames'
import { FC } from 'react'
import { TodoItem } from '../../TodoItem'
import { useTodos } from '../../Store'

interface Props {
    item: TodoItem;
    setShowMenu: (newValue: boolean) => void;
    //isEditingDisabled: boolean;
    //onEdit: () => void;
    //onSave: () => void;
    //onDelete: () => void;
}

const Menu: FC<Props> = ({ item, setShowMenu }) => {
    const saveChanges = useTodos(state => state.saveChanges)
    const deleteTodo = useTodos(state => state.deleteTodo)
    const setEditingDisabled = useTodos(state => state.setEditingDisabled)
    const setAddingDisabled = useTodos(state => state.setAddingDisabled)
    const isEditingDisabled = useTodos(state => state.isEditingDisabled)
    const btnIconComplete = classNames(noteStyles.btnIcons, menuStyles.iconComplete)
    const btnIconEdit = classNames(noteStyles.btnIcons, menuStyles.iconEdit, menuStyles.btnEditDisable)
    const btnIconDelete = classNames(noteStyles.btnIcons, menuStyles.iconDelete)
    const btnCompleteClass = classNames(noteStyles.buttons, menuStyles.COMPLETE)
    const btnEditClass = classNames(noteStyles.buttons, noteStyles.MEDIUM)
    const btnEditDisable = classNames(noteStyles.notButtons, noteStyles.LOW)
    const btnDeleteClass = classNames(noteStyles.buttons, noteStyles.CRITICAL)

    const handleCompleteClick = () => {
        const completedItem = {
            id: item.id,
            level: item.level,
            completed: true,
            isSaved: item.isSaved
        }
        setShowMenu(false)
        saveChanges(completedItem)
    }

    const handleEditClick = () => {
        const unsavedItem = {
            id: item.id,
            level: item.level,
            completed: item.completed,
            isSaved: false
        }
        setShowMenu(false)
        saveChanges(unsavedItem)
        setEditingDisabled(true)
        setAddingDisabled(true)
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
                {!isEditingDisabled ? 
                <div className={btnEditClass}
                onClick={handleEditClick}>
                    <div className={btnIconEdit}></div>
                    EDIT
                </div>:
                <div className={btnEditDisable}>
                    <div className={btnIconEdit}></div>
                    EDIT
                </div>}
                
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