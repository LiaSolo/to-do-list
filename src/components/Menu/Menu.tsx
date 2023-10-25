import menuStyles from "./Menu.module.scss";
import { FC } from "react";
import { TodoItem } from "../../TodoItem";
import { useTodos } from "../../store";
import Button from "../Button/Button";
import iconEdit from "../../assets/edit.svg";
import iconDelete from "../../assets/delete.svg";
import iconComplete from "../../assets/done.svg";

interface Props {
    item: TodoItem;
    setShowMenu: (newValue: boolean) => void;
}

const Menu: FC<Props> = ({ item, setShowMenu }) => {
    const replaceTodo = useTodos((state) => state.replaceTodo);
    const editState = useTodos((state) => state.editState);
    const deleteTodo = useTodos((state) => state.deleteTodo);

    const handleCompleteClick = () => {
        const completedItem = {
            ...item,
            completed: true,
        };
        setShowMenu(false);
        replaceTodo(completedItem);
    };

    const handleEditClick = () => {
        setShowMenu(false);
        editState(item, 'edit')
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
