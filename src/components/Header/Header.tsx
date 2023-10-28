import styles from "./Header.module.scss";
import { FC, ChangeEvent } from "react";
import { useTodos } from "../../store";
import Button from "../Button/Button";
import iconAdd from "../../assets/add.svg";

const Header: FC = () => {
    const { searchText, setSearchText, createEmptyTodo, newTodoId } = useTodos(
        (state) => state
    );
    const isAddingDisabled = newTodoId === undefined ? false : true

    const handleChangeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    return (
        <div className={styles.Header}>
            <span>Yet Another Todo List</span>
            <input
                value={searchText}
                placeholder="Search me Daddy..."
                disabled={isAddingDisabled}
                className={styles.searchBox}
                onChange={handleChangeSearchText}
            />

            <Button
                isDisabled={isAddingDisabled}
                hasIcon={true}
                icon={iconAdd}
                text="CREATE"
                btnColor="Primary"
                onClick={createEmptyTodo}
            />
        </div>
    );
};

export default Header;
