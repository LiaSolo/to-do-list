import styles from "./Button.module.scss";
import { FC } from "react";
import { mapVariantToColor } from "../../constants";
import classNames from "classnames";

interface Props {
    text: string;
    btnColor: "Primary" | "PrimaryLight" | "Error" | "Success";
    hasIcon?: boolean;
    icon?: string;
    classNamePadding?: string;
    isDisabled?: boolean;
    onClick?: () => void;
}

const Button: FC<Props> = ({
    onClick,
    isDisabled = false,
    hasIcon = false,
    icon,
    text,
    btnColor,
}) => {
    return (
        <button
            className={classNames(styles.Button)}
            disabled={isDisabled}
            style={{
                backgroundColor: mapVariantToColor[btnColor],
            }}
            onClick={onClick}
        >
            {hasIcon && <img height={16} src={icon} />}
            {text}
        </button>
    );
};

export default Button;
