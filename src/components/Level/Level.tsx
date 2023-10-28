import styles from "./Level.module.scss";
import { FC } from "react";
import classNames from "classnames";
import { TodoItem } from "../../TodoItem";
import SelectLevels from "../selectLevels/selectLevels";
import { TodoLevel, TodoState } from "../../constants";

interface Props {
    item: TodoItem;
    state: TodoState;
    selectedLevel: TodoLevel;
    setLevel: (newOption: TodoLevel) => void;
}

const Level: FC<Props> = ({ item, state, selectedLevel, setLevel }) => {
    if (state === "create" || state === "edit") {
        return (
            <SelectLevels selectedLevel={selectedLevel} setLevel={setLevel} />
        );
    }
    if (item.completed) {
        return (
            <div className={styles.completed}>
                <div
                    className={classNames(
                        styles.iconDone,
                        styles[selectedLevel]
                    )}
                />
                <div
                    className={classNames(
                        styles.Level,
                        styles[`border${selectedLevel}`]
                    )}
                >
                    {selectedLevel}
                </div>
            </div>
        );
    }
    return (
        <div className={classNames(styles.Level, styles[item.level])}>
            {item.level}
        </div>
    );
};

export default Level;
