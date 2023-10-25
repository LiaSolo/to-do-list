import styles from './Buttons.module.scss'
import { FC } from 'react'

interface Props {
    text: string;
    btnColor: string;
    hasIcon?: boolean;
    icon?: string;
    iconSize?: string;
    btnWidth?: string;
    hasPadding?: string;
    isDisabled?: boolean;
    onClick?: () => void;
}

const Buttons: FC<Props> = ({ onClick, isDisabled=false, hasIcon=false, hasPadding, icon, iconSize, btnWidth='auto', text, btnColor }) => {
    return (
        <button className={styles.Buttons} 
            disabled={isDisabled}          
            style={{
                width: btnWidth, 
                backgroundColor: btnColor, 
                padding: hasPadding}}
            onClick={onClick}
        >
            {hasIcon ? 
                <div className={styles.btnIcons} 
                    style={{
                        height: iconSize, 
                        width: iconSize, 
                        backgroundSize: iconSize, 
                        backgroundImage: `url('src/assets/${icon}.svg')`}}>
                </div> : ''}
            {text}
        </button>
    )
        
}

export default Buttons