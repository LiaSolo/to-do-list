import { ChangeEvent, useState } from 'react'
import { TodoItem } from '../../TodoItem'
import { FC } from 'react'
import classNames from 'classnames'
import styles from './Note.module.scss'
import Menu from '../Menu/Menu'
import { useTodos } from '../../Store'
import Buttons from '../Buttons/Buttons'
import Level from '../Level/Level'

interface Props {
    item: TodoItem;
}

const Note: FC<Props> = ({ item }) => {
    const saveChanges = useTodos(state => state.saveChanges)
    const addTodo = useTodos(state => state.addTodo)
    const setAddingDisabled = useTodos(state => state.setAddingDisabled)
    const isSaved = item.state === 'default'? true : false
    const [textTitle, setTextTitle] = useState(item.title)
    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTextTitle(event.target.value)
    }

    const [textBody, setTextBody] = useState(item.body)
    const handleChangeBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextBody(event.target.value)
    }

    const handleSaveClick = () => {
        const savedItem = {
            id: item.id,
            level: selectedLevel,
            completed: false,
            title: textTitle,
            body: textBody,
            state: 'default'
        }
        if (savedItem.state === 'create') {
            addTodo(savedItem)
        } 
        else {
            saveChanges(savedItem)
            setAddingDisabled(false)
        }
    }

    const [isShowMenu, setShowMenu] = useState(false);
    const handleMenuClick = () => {
        setShowMenu(!isShowMenu);
    }

    const [selectedLevel, setLevel] = useState('MEDIUM');

    return (
        <div className={classNames(styles.Note, 
            isSaved ? styles[`border${selectedLevel}`] : '',
            item.completed ? styles.completed : '')}>
            {isShowMenu ?
                <Menu 
                    item={item} 
                    setShowMenu={setShowMenu}
                /> : ''}
            {isSaved && !item.completed ?
                <div className={isShowMenu ? 
                                    classNames(styles.menuIcons, styles.close) : 
                                    classNames(styles.menuIcons, styles.dots)} 
                    onClick={handleMenuClick}>
                </div> : ''} 
            <div className={styles.header}>        
                {!isSaved ? 
                    <Buttons btnColor='#395B64' text='SAVE' onClick={handleSaveClick}/>
                    : '' }                              
                <Level item={item} selectedLevel={selectedLevel} setLevel={setLevel} />

                <div className={isSaved ? classNames(styles.titleNoteBox, styles.noBorder, styles[`text${selectedLevel}`]) : styles.titleNoteBox}>
                    <input 
                        value={textTitle} onChange={handleChangeTitle}
                        type='text'
                        maxLength={30}
                        placeholder='Title'
                        disabled={isSaved}
                        className={styles.inputTitle}>
                         
                    </input>
                </div>
                          
            </div>

            <div className={isSaved ? classNames(styles.bodyNoteBox, styles.noBorder) : styles.bodyNoteBox}>
                <textarea
                    value={textBody} onChange={handleChangeBody}
                    placeholder='Body'
                    className={styles.textareaBody}
                    disabled={isSaved}>
                </textarea>
            </div>

        </div>
    );
} 

export default Note
