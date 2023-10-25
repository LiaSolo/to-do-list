import { ChangeEvent, useState } from "react";
import { TodoItem } from "../../TodoItem";
import { FC } from "react";
import classNames from "classnames";
import styles from "./Note.module.scss";
import Menu from "../Menu/Menu";
import { useTodos } from "../../store";
import Button from "../Button/Button";
import Level from "../Level/Level";
import { TodoLevel } from "../../constants";

interface Props {
    item: TodoItem;
}

const Note: FC<Props> = ({ item }) => {
    const [textBody, setTextBody] = useState(item.body);
    const [isShowMenu, setShowMenu] = useState(false);
    const [selectedLevel, setLevel] = useState<TodoLevel>("MEDIUM");
    const [textTitle, setTextTitle] = useState(item.title);

    const saveChanges = useTodos((state) => state.replaceTodo);
    const addTodo = useTodos((state) => state.addTodo);
    const setAddingDisabled = useTodos((state) => state.setAddingDisabled);

    const isSaved = item.state === "default" ? true : false;

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTextTitle(event.target.value);
    };

    const handleChangeBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextBody(event.target.value);
    };

    const handleSaveClick = () => {
        const savedItem: TodoItem = {
            id: item.id,
            level: selectedLevel,
            completed: false,
            title: textTitle,
            body: textBody,
            state: "default",
        };
        if (savedItem.state === "create") {
            addTodo(savedItem);
        } else {
            saveChanges(savedItem);
            setAddingDisabled(false);
        }
    };

    const handleMenuClick = () => {
        setShowMenu(!isShowMenu);
    };

    return (
        <div
            className={classNames(
                styles.Note,
                isSaved ? styles[`border${selectedLevel}`] : "",
                item.completed ? styles.completed : ""
            )}
        >
            {isShowMenu ? <Menu item={item} setShowMenu={setShowMenu} /> : ""}
            {isSaved && !item.completed && (
                <div
                    className={
                        isShowMenu
                            ? classNames(styles.menuIcons, styles.close)
                            : classNames(styles.menuIcons, styles.dots)
                    }
                    onClick={handleMenuClick}
                ></div>
            )}
            <div className={styles.header}>
                {!isSaved && (
                    <Button
                        btnColor="Primary"
                        text="SAVE"
                        onClick={handleSaveClick}
                    />
                )}
                <Level
                    item={item}
                    selectedLevel={selectedLevel}
                    setLevel={setLevel}
                />

                <div
                    className={classNames(
                        styles.titleNoteBox,
                        isSaved && styles.noBorder,
                        isSaved && styles[`text${selectedLevel}`]
                    )}
                >
                    <input
                        value={textTitle}
                        onChange={handleChangeTitle}
                        type="text"
                        maxLength={30}
                        placeholder="Title"
                        disabled={isSaved}
                        className={styles.inputTitle}
                    ></input>
                </div>
            </div>

            <div
                className={classNames(
                    styles.bodyNoteBox,
                    isSaved && styles.noBorder
                )}
            >
                <textarea
                    value={textBody}
                    onChange={handleChangeBody}
                    placeholder="Body"
                    className={styles.textareaBody}
                    disabled={isSaved}
                ></textarea>
            </div>
        </div>
    );
};

export default Note;
