import styles from './App.module.scss'
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';

function App() {

  
  return (
    <div className={styles.App}>
      <Header />
      <TodoList />
    </div>
  )
}

export default App
