import { useState } from 'react'
import Note from './components/Note/Note'
import styles from './App.module.scss'

let counter = 0;
function App() {
  const [isAdding, setAdding] = useState(false);
  const handleAddNoteClick = () => {
        setAdding(!isAdding);
  }
  const handleServiceRemove = (index: number) => {
    debugger
    //const list = [...serviceList];
    notes.splice(index, 1);
    //setServiceList(list);
  };

  const notes = [
  <Note 
    key={0}
    handleServiceRemove={handleServiceRemove}
    index={0}
  />] 
  const [serviceList, setServiceList] = useState(notes);
  const handleServiceAdd = () => {
    debugger
    counter++
    const new_note = <Note 
    key={counter}
    handleServiceRemove={handleServiceRemove}
    index={counter}
  />
    //notes.push(new_note)
    debugger
    //setServiceList([...serviceList, new_note])
  };

  const btn_add_note_class = `${styles.btn_add_note} ${isAdding? styles[`adding`]: ''}`
  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span>Yet Another Todo List</span>
          <input className={styles.search_box} value='123'></input>
          <div className={btn_add_note_class} onClick={handleServiceAdd}></div>
        </div>    
      </div>
      <div className={styles.main}>
      {notes && notes.map((singleNote) => (
            singleNote
        ))
      }
      </div>

    </div>
  )
}

export default App
