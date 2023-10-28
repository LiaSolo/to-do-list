import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import "@fontsource/source-sans-pro";
import "@fontsource/lora/700.css";

function App() {
    return (
        <div className={styles.App}>
            <Header />
            <TodoList />
        </div>
    );
}

export default App;
