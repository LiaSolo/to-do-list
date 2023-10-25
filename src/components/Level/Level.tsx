import styles from './Level.module.scss'
import { FC } from 'react'
import classNames from 'classnames'
import { TodoItem } from '../../TodoItem'
import SelectLevels from '../selectLevels/selectLevels'

interface Props {
    item: TodoItem;
    selectedLevel: string;
    setLevel: (newOption: string) => void;
}

const Level: FC<Props> = ({item, selectedLevel, setLevel}) => {
    if (item.state === 'create' || item.state === 'edit') {
        return <SelectLevels selectedLevel={selectedLevel} setLevel={setLevel} />
    }
    if (item.completed) {
        return (
            <div className={styles.completed}>
                <div className={classNames(styles.iconDone, styles[selectedLevel])}></div>
                <div className={classNames(styles.Level, styles[`border${selectedLevel}`])}>{selectedLevel}</div>
            </div>
        )
    }
    return (
        <div className={classNames(styles.Level, styles[item.level])}>
                {item.level}
        </div>
    )
}

export default Level
