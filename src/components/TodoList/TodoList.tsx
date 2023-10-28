import styles from "./TodoList.module.scss";
import { FC, useEffect } from "react";
import { useTodos } from "../../store";
import Note from "../Note/Note";
import { compareNotes } from "../../compareNotes";

const TodoList: FC = () => {
    const { todos, searchText, fetchTodos, newTodoId } = useTodos();

    useEffect(() => {
        fetchTodos();
    }, []);
    return (
        <div className={styles.TodoList}>
            <div className={styles.notesContainer}>
                {todos &&
                    todos
                        .filter((item) =>
                            item.title
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                        )
                        .sort((elem1, elem2) =>
                            compareNotes(elem1, elem2, newTodoId)
                        )
                        .map((item) => <Note key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export default TodoList;
