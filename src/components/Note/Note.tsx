import { useState } from 'react'
import { TodoItem } from '../../TodoItem'
import { FC } from 'react'
import classNames from 'classnames'

import styles from './Note.module.scss'
import Menu from '../Menu/Menu'
import { useTodos } from '../../Store'


interface Props {
    key: string;
    item: TodoItem;
}

const Note: FC<Props> = ({ item }) => {
    const saveChanges = useTodos(state => state.saveChanges)
    const addTodo = useTodos(state => state.addTodo)
    const setAddingDisabled = useTodos(state => state.setAddingDisabled)
    const menuIconDots = classNames(styles.menuIcons, styles.dots)
    const menuIconClose = classNames(styles.menuIcons, styles.close)
    const selectIcon = classNames(styles.btnIcons, styles.iconSelect)
    const titleNoteBoxSaved = classNames(styles.titleNoteBox, styles.noBorder)
    const bodyNoteBoxSaved = classNames(styles.bodyNoteBox, styles.noBorder)
    const isSaved = item.state === 'default'? true : false

    const handleSaveClick = () => {
        const savedItem = {
            id: item.id,
            level: selectedOption,
            completed: false,
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

    const [isShowOptions, setShowOptions] = useState(false);
    const handleOptionsClick = () => {
        setShowOptions(!isShowOptions);
    }

    const [selectedOption, setOption] = useState('MEDIUM');
    const handleLowSelect = () => {
        setShowOptions(!isShowOptions);
        setOption('LOW');
    }
    const handleMediumSelect = () => {
        setShowOptions(!isShowOptions);
        setOption('MEDIUM');
    }
    const handleCriticalSelect = () => {
        setShowOptions(!isShowOptions);
        setOption('CRITICAL');
    }

    const styleOptions = (lvl: string) => {
        return(
            {backgroundColor: selectedOption === lvl ? '#395B64':'',
            color: selectedOption === lvl ? 'white':'black'}
        )    
    }

    return (
        <div className={classNames(styles.Note, 
            isSaved ? styles[`border${selectedOption}`] : '',
            item.completed ? styles.done : '')}>
            {isShowMenu ?
                <Menu 
                    item={item} 
                    setShowMenu={setShowMenu}
                /> : ''
            }
            {isSaved && !item.completed ?
                <div className={isShowMenu ? menuIconClose : menuIconDots} onClick={handleMenuClick}></div>
                : ''
            } 
            <div className={styles.header}>        
                <div>                  
                    {isSaved ?
                        <>
                            {item.completed ?
                                <div className={styles.containerCompletedOuter}>
                                    <div className={classNames(styles.bigIconDone, styles[`${selectedOption}`])}></div>
                                    <div className={classNames(styles.containerCompletedInner, styles[`border${selectedOption}`])}>{selectedOption}</div>
                                </div>:
                                <div className={classNames(styles.notButtons, isSaved ? styles[`${selectedOption}`] : '')}>              
                                    {selectedOption}
                                </div>
                            }
                        </> :
                        <div className={styles.saved}>
                            <div className={styles.buttons} onClick={handleSaveClick}>SAVE</div>
                            <div>
                                <div className={styles.buttons} onClick={handleOptionsClick}>
                                    {selectedOption}
                                    <div className={selectIcon}></div>    
                                </div>
                                    {isShowOptions?
                                        <div>
                                            <div className={styles.drop_down_options} 
                                            style={styleOptions('CRITICAL')}
                                            onClick={handleCriticalSelect}>Critical</div>
                                            <div className={styles.drop_down_options}
                                            style={styleOptions('MEDIUM')}
                                            onClick={handleMediumSelect}>Medium</div>
                                            <div className={styles.drop_down_options}
                                            style={styleOptions('LOW')}
                                            onClick={handleLowSelect}>Low</div>
                                        </div> : ''
                                    } 
                            </div>
                            
                        </div>
                    }                              
                </div>

                <div className={isSaved ? titleNoteBoxSaved : styles.titleNoteBox}>
                    <input 
                        type='text'
                        maxLength={30}
                        placeholder='Title'
                        disabled={isSaved}
                        className={styles.inputTitle}>
                         
                    </input>
                </div>
                          
            </div>

            <div className={isSaved ? bodyNoteBoxSaved : styles.bodyNoteBox}>
                <textarea
                    placeholder='Body'
                    className={styles.textareaBody}
                    disabled={isSaved}>
                </textarea>
            </div>

        </div>
    );
} 

export default Note
