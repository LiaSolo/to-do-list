import { ChangeEvent, useState } from "react";
import { TodoItem } from "../../TodoItem";
import { FC } from "react";
import classNames from "classnames";
import styles from "./Note.module.scss";
import Menu from "../Menu/Menu";
import { useTodos } from "../../store";
import Button from "../Button/Button";
import Level from "../Level/Level";
import { TodoLevel, TodoState } from "../../constants";

interface Props {
    item: TodoItem;
}

const Note: FC<Props> = ({ item }) => {
    const newTodoId = useTodos((state) => state.newTodoId);
    const replaceTodo = useTodos((state) => state.replaceTodo);

    const [textBody, setTextBody] = useState(item.body);
    const [isShowMenu, setShowMenu] = useState(false);
    const [state, setState] = useState<TodoState>(
        newTodoId === item.id ? "create" : "default"
    );
    const [selectedLevel, setLevel] = useState<TodoLevel>(item.level);
    const [textTitle, setTextTitle] = useState(item.title);

    const isSaved = state === "default" ? true : false;

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
        };
        replaceTodo(savedItem, state);
        setState("default");
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
            {isShowMenu ? (
                <Menu
                    item={item}
                    setShowMenu={setShowMenu}
                    setState={setState}
                />
            ) : (
                ""
            )}
            {isSaved && !item.completed && (
                <div
                    className={
                        isShowMenu
                            ? classNames(styles.menuIcons, styles.close)
                            : classNames(styles.menuIcons, styles.dots)
                    }
                    onClick={handleMenuClick}
                />
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
                    state={state}
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
                    />
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
                />
            </div>
        </div>
    );
};

export default Note;
