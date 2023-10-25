import styles from "./Header.module.scss";
import { FC } from "react";
import { useTodos } from "../../store";
import Button from "../Button/Button";
import iconAdd from "../../assets/add.svg";

const Header: FC = () => {
    const createEmptyTodo = useTodos((s) => s.createEmptyTodo);
    const isAddingDisabled = useTodos((s) => s.isAddingDisabled);
    return (
        <div className={styles.Header}>
            <span>Yet Another Todo List</span>
            <input
                type="search"
                placeholder="Search me Daddy..."
                disabled={isAddingDisabled}
                className={styles.searchBox}
            ></input>

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
