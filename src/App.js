import React, { useState } from 'react';
import './App.css';



const App = () => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const inputOnChange = (e) => {
    setInput(e.target.value);
  }


  const onClickAdd = () => {
    tasks.push({
      text: input,
    });

    setTasks([...tasks]);
    setInput('');
  }

  return (
    <div className="main">
      <div className="container-input">
        <input type="text" className="add-input" placeholder="type to add" onChange={(e) => inputOnChange(e)} value={input} />
        <button onClick={() => onClickAdd()}>Add</button>
      </div>
      <div className="tasks">
      {
        tasks.map((item, index) => {
          return (
            <div key={`task-${index}`} className="task">
              <input type="checkBox" className="checkBox"/>
              <p className="text">{item.text}</p>
              <button className="but-task">Edit</button>
              <button className="but-task">Delete</button>
            </div>
          )
        })
      }
      </div>
    </div>
  );
}

export default App;
