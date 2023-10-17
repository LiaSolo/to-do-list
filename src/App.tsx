import { useState } from 'react'
import Note from './components/Note/Note'
import styles from './App.module.scss'

function App() {
  const [isAdding, setAdding] = useState(false);
  const handleAddNoteClick = () => {
        setAdding(!isAdding);
  }
  const [serviceList, setServiceList] = useState([{ service: "" }, { service: "" }]);
  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }])
    console.log(serviceList)
  };

  
  const btn_add_note_class = `${styles.btn_add_note} ${isAdding? styles[`adding`]: ''}`
  return (
    <>
    <div className={styles.header}>
      <div className={styles.left}>
        <span>Yet Another Todo List</span>
        <div className={styles.search_box}></div>
        <div className={btn_add_note_class} onClick={handleServiceAdd}></div>
      </div>    
    </div>
    
    {serviceList.map((singleService, index) => (
        <div key={index}>
          <Note level={'low'} />
        </div>
      ))
    }

    </>
  )
}

export default App
