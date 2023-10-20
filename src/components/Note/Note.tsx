import { useState } from 'react'
import { TodoItem } from '../../TodoItem'
import { FC } from 'react'
import classNames from 'classnames'
import "@fontsource/source-sans-pro"
import "@fontsource/lora/700.css"
import styles from './Note.module.scss'
import Menu from '../Menu/Menu'
import { useTodos } from '../../Store'


interface Props {
    key: string;
    item: TodoItem;
    //isEditingDisabled: boolean;
    //onEdit: () => void;
    //onSave: () => void;
    //onDelete: () => void;
}

const Note: FC<Props> = ({ item }) => { //{ level }: { level: string }
    const saveChanges = useTodos(state => state.saveChanges)
    const setEditingDisabled = useTodos(state => state.setEditingDisabled)
    const setAddingDisabled = useTodos(state => state.setAddingDisabled)
    const menuIconDots = classNames(styles.menuIcons, styles.dots)
    const menuIconClose = classNames(styles.menuIcons, styles.close)
    const selectIcon = classNames(styles.btnIcons, styles.iconSelect)

    const handleSaveClick = () => {
        const savedItem = {
            id: item.id,
            level: selectedOption,
            completed: item.completed,
            isSaved: true
        }
        saveChanges(savedItem)
        setEditingDisabled(false)
        setAddingDisabled(false)
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
            item.isSaved ? styles[`border${selectedOption}`] : '',
            item.completed ? styles.done : '')}>
            {isShowMenu ?
                <Menu 
                    item={item} 
                    setShowMenu={setShowMenu}
                /> : ''
            }
            {item.isSaved && !item.completed ?
                <div className={isShowMenu ? menuIconClose : menuIconDots} onClick={handleMenuClick}></div>
                : ''
            } 
            <div className={styles.header}>        
                <div>                  
                    {item.isSaved ?
                        <>
                            {item.completed ?
                                <div className={styles.containerCompletedOuter}>
                                    <div className={classNames(styles.bigIconDone, styles[`${selectedOption}`])}></div>
                                    <div className={classNames(styles.containerCompletedInner, styles[`border${selectedOption}`])}>{selectedOption}</div>
                                </div>:
                                <div className={classNames(styles.notButtons, item.isSaved ? styles[`${selectedOption}`] : '')}>              
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
                <div className={styles.set_name_note_box}>{item.level}</div>
            </div>
            <div className={styles.body_note_box}></div>
        </div>
    );
} 

export default Note
