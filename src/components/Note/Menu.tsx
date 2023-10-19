import styles from './Note.module.scss'

function Menu(props: any) {
    const handleEditClick = () => {
        props.handleMenuClick()
        props.handleSaveClick()
    }

    const handleDeleteClick = () => {
        props.handleMenuClick()
        props.handleServiceRemove(props.index)
        console.log(props.index)
    }

    return(
        <div className={styles.menu}>
            <div className={styles.menu_btns_container}>
                <div className={`${styles.buttons} ${styles.COMPLETE}`}
                onClick={props.handleCompleteClick}>
                    <div className={`${styles.btn_icons} ${styles.icon_done}`}></div>
                    COMPLETE
                </div>
                <div className={`${styles.buttons} ${styles.MEDIUM}`}
                onClick={handleEditClick}>
                    <div className={`${styles.btn_icons} ${styles.icon_edit}`}></div>
                    EDIT
                </div>
                <div className={`${styles.buttons} ${styles.CRITICAL}`}
                onClick={handleDeleteClick}>
                    <div className={`${styles.btn_icons} ${styles.icon_delete}`}></div>
                    DELETE
                </div>
            </div>
            
        </div>
    )
}

export default Menu