import { useState } from 'react'
import styles from './Note.module.scss'
import Menu from './Menu'
import "@fontsource/source-sans-pro"
import "@fontsource/lora/700.css"


const Note= (props: any) => { //{ level }: { level: string }

    const [isSaved, setSaved] = useState(false);
    const handleSaveClick = () => {
        setSaved(!isSaved);
    }

    const [isComplete, setComplete] = useState(false);
    const handleCompleteClick = () => {
        setComplete(!isComplete);
        setShowMenu(false);
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

    function styleOptions(lvl: string) {
        return(
            {backgroundColor: selectedOption === lvl ? '#395B64':'',
            color: selectedOption === lvl ? 'white':'black'}
        )    
    }

    return (
        <>
        <div className={`${styles.container_outer} 
            ${isSaved ? styles[`cont_${selectedOption}`] : ''}
            ${isComplete ? styles.done : ''}`}>
            {isShowMenu ?
                <Menu 
                    handleSaveClick={handleSaveClick}
                    handleMenuClick={handleMenuClick}
                    handleCompleteClick={handleCompleteClick}
                    handleServiceRemove={props.handleServiceRemove}
                    index={props.index} 
                /> : ''
            }
            {isSaved ?
                <>
                    {isShowMenu ?
                        <div className={`${styles.menu_icons} ${styles.close}`} onClick={handleMenuClick}></div> :
                        <div className={`${styles.menu_icons} ${styles.dots}`} onClick={handleMenuClick}></div>
                    }
                </> : ''
            }
            
            
            <div className={styles.header}>        
                <div>                  
                    {isSaved ?
                        <>
                            {isComplete ?
                                <div style={{display: 'flex'}}>
                                    <div className={`${styles.big_icon_done} ${styles[`${selectedOption}`]}`}></div>
                                    <div className={`${styles.container_done_inner} ${styles[`cont_${selectedOption}`]}`}>{selectedOption}</div>
                                </div>:
                                <div className={`${styles.buttons} ${isSaved ? styles[`${selectedOption}`] : ''}`}>              
                                    {selectedOption}
                                </div>
                            }
                        </> :
                        <div className={styles.saved}>
                            <div className={styles.buttons} onClick={handleSaveClick}>SAVE</div>
                            <div>
                                <div className={styles.buttons} onClick={handleOptionsClick}>
                                    {selectedOption}
                                    <div className={`${styles.btn_icons} ${styles.icon_select}`}></div>    
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
                <input className={styles.set_name_note_box}></input>
            </div>
            <div className={styles.body_note_box}></div>
        </div>

        </>
    );
} 

export default Note
