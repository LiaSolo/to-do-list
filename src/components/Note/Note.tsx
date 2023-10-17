import { useState } from 'react'
import styles from './Note.module.scss'
import "@fontsource/source-sans-pro"
import "@fontsource/lora/700.css"


function Note({ level }: { level: string }) {
    const container_className = `${styles.container_outer} ${styles[`cont_${level}`]}`
    const importance_class = `${styles.importance} ${styles[`imprt_${level}`]}`

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

    return (
        <>
        <div className={container_className}>
            <div className={styles.header}>
                <div className={styles.btn_save}>SAVE</div>
                <div>
                    <div className={importance_class} onClick={handleOptionsClick}>
                        {selectedOption}
                        <div className={styles.select_icon}></div>    
                    </div>
                    {isShowOptions?
                    <div>
                        <div className={styles.drop_down_options} 
                        style={{backgroundColor: selectedOption === 'CRITICAL'?
                        '#395B64':''}}
                        onClick={handleCriticalSelect}>Critical</div>
                        <div className={styles.drop_down_options}
                        style={{backgroundColor: selectedOption === 'MEDIUM'?
                        '#395B64':''}}
                        onClick={handleMediumSelect}>Medium</div>
                        <div className={styles.drop_down_options}
                        style={{backgroundColor: selectedOption === 'LOW'?
                        '#395B64': ''}}
                        onClick={handleLowSelect}>Low</div>
                    </div> : ''}                 
                </div>           
                <input className={styles.set_name_note_box}>
                </input>
            </div>
            <div className={styles.body_note_box}></div>
        </div>

        </>
    );
} 

export default Note
