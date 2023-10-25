import styles from './selectLevels.module.scss'
import { FC } from 'react'
import { useState } from 'react'

interface Props {
    selectedLevel: string;
    setLevel: (newOption: string) => void;
}

const SelectLevels: FC<Props> = ({selectedLevel, setLevel}) => {

    const [isShowOptions, setShowOptions] = useState(false);
    const handleShowOptionsClick = () => {
        setShowOptions(!isShowOptions);
    }

    const handleLowSelected = () => {
        setShowOptions(!isShowOptions);
        setLevel('LOW');
    }
    const handleMediumSelected = () => {
        setShowOptions(!isShowOptions);
        setLevel('MEDIUM');
    }
    const handleCriticalSelected = () => {
        setShowOptions(!isShowOptions);
        setLevel('CRITICAL');
    }

    const styleOptions = (lvl: string) => {
        return(
            {backgroundColor: selectedLevel === lvl ? '#395B64':'',
            color: selectedLevel === lvl ? 'white':'black'}
        )    
    }
    
    return (
        <div className={styles.SelectLevels}>
            <div className={styles.dropDown} onClick={handleShowOptionsClick}>
                {selectedLevel}
                <div className={styles.iconSelect}></div>    
            </div>
            {isShowOptions?
                <div className={styles.dropDownOptionsContainer}>
                    <div className={styles.dropDownOptions} 
                        style={styleOptions('CRITICAL')}
                        onClick={handleCriticalSelected}>
                            Critical
                    </div>
                    <div className={styles.dropDownOptions}
                        style={styleOptions('MEDIUM')}
                        onClick={handleMediumSelected}>
                            Medium
                    </div>
                    <div className={styles.dropDownOptions}
                        style={styleOptions('LOW')}
                        onClick={handleLowSelected}>
                            Low
                    </div>
                </div> : ''} 
        </div>
    )
}

export default SelectLevels