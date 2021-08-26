import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    });
  }, [setTasks])

  const onClickAdd = () => {
    axios.post('http://localhost:8000/createTask', {
      text: textInput,
      isCheck: false,
    }).then(res => {
      setTasks(res.data.data);
    });

    setTextInput('');
  }

  const changeCheckBox = (index) => {
    const { _id, isCheck } = tasks[index];

    axios.patch('http://localhost:8000/updateTask', { _id, isCheck: !isCheck }).then(res => {
      setTasks(res.data.data);
    });
  }
  const onClickDell = (index) => {
    axios.delete(`http://localhost:8000/deleteTask?_id=${tasks[index]._id}`).then(res => {
      setTasks(res.data.data);
    });
  }

  return (
    <div className="main">
      <div className="container-input">
        <input
          type="text"
          className="add-input"
          placeholder="type to add"
          onChange={(e) => setTextInput(e.target.value)}
          value={textInput}
        />
        <button onClick={() => onClickAdd()}>Add</button>
      </div>
      <div className="tasks">
      {
        tasks.map((item, index) =>
          <div key={`task-${index}`} className="task">
            <input
              type="checkBox"
              className="checkBox"
              defaultChecked={item.isCheck}
              onClick={() => changeCheckBox(index)}
            />
            <p className={!item.isCheck ? "text" : "text-done"}>{item.text}</p>
            <button className="but-task">Edit</button>
            <button className="but-task" onClick={() => onClickDell(index)}>Delete</button>
          </div>
        )
      }
      </div>
    </div>
  );
}

export default App;