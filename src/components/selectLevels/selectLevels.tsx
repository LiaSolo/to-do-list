import styles from "./selectLevels.module.scss";
import { FC } from "react";
import { useState } from "react";
import { TodoLevel, levelByImportance } from "../../constants";

interface Props {
    selectedLevel: TodoLevel;
    setLevel: (newOption: TodoLevel) => void;
}

const SelectLevels: FC<Props> = ({ selectedLevel, setLevel }) => {
    const [isShowOptions, setShowOptions] = useState(false);

    const handleShowOptionsClick = () => {
        setShowOptions(!isShowOptions);
    };

    const handleLevelChange = (newLevel: TodoLevel) => {
        setShowOptions(!isShowOptions);
        setLevel(newLevel);
    };

    const styleOptions = (lvl: string) => {
        return {
            backgroundColor: selectedLevel === lvl ? "#395B64" : "",
            color: selectedLevel === lvl ? "white" : "black",
        };
    };

    return (
        <div className={styles.SelectLevels}>
            <div className={styles.dropDown} onClick={handleShowOptionsClick}>
                {selectedLevel}
                <div className={styles.iconSelect}></div>
            </div>
            {isShowOptions && (
                <div className={styles.dropDownOptionsContainer}>
                    {levelByImportance.map((lvl) => (
                        <div
                            className={styles.dropDownOptions}
                            style={styleOptions(lvl)}
                            onClick={() => handleLevelChange(lvl)}
                        >
                            {lvl}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectLevels;
