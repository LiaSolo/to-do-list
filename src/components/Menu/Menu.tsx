import menuStyles from "./Menu.module.scss";
import { FC } from "react";
import { TodoItem } from "../../TodoItem";
import { useTodos } from "../../store";
import Button from "../Button/Button";
import iconEdit from "../../assets/edit.svg";
import iconDelete from "../../assets/delete.svg";
import iconComplete from "../../assets/done.svg";
import { TodoState } from "../../constants";

interface Props {
    item: TodoItem;
    setShowMenu: (newValue: boolean) => void;
    setState: (newState: TodoState) => void;
}

const Menu: FC<Props> = ({ item, setShowMenu, setState }) => {
    const replaceTodo = useTodos((state) => state.replaceTodo);
    const deleteTodo = useTodos((state) => state.deleteTodo);

    const handleCompleteClick = () => {
        const completedItem = {
            ...item,
            completed: true,
        };
        setShowMenu(false);
        replaceTodo(completedItem, "default");
    };

    const handleEditClick = () => {
        setShowMenu(false);
        setState("edit");
    };

    const handleDeleteClick = () => {
        setShowMenu(false);
        deleteTodo(item);
    };

    return (
        <div className={menuStyles.Menu}>
            <div className={menuStyles.btnsContainer}>
                <Button
                    btnColor="Success"
                    hasIcon={true}
                    icon={iconComplete}
                    text="COMPLETE"
                    onClick={handleCompleteClick}
                />
                <Button
                    btnColor="Primary"
                    hasIcon={true}
                    icon={iconEdit}
                    text="EDIT"
                    onClick={handleEditClick}
                />
                <Button
                    btnColor="Error"
                    hasIcon={true}
                    icon={iconDelete}
                    text="DELETE"
                    onClick={handleDeleteClick}
                />
            </div>
        </div>
    );
};

export default Menu;
