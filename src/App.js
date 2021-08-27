import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [flagEdit, setFlagEdit] = useState('');
  const [inputEdit, setInputEdit] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    });
  }, [setTasks])

  const onClickAdd = () => {
    if (!textInput.trim()){
      setTextInput('');
      return alert('ERROR');
    }
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
  const onClickDell = (_id) => {
    axios.delete(`http://localhost:8000/deleteTask?_id=${_id}`).then(res => {
      setTasks(res.data.data);
    });
  }

  const onClickEdit = (index) => {
    if (!inputEdit.trim()){
      setInputEdit('');
      return alert('ERROR');
    }
    const { _id } = tasks[index];

    axios.patch('http://localhost:8000/updateTask', { _id, text: inputEdit }).then(res => {
      setTasks(res.data.data);
    });

    setInputEdit('');
    setFlagEdit('');
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
              checked={item.isCheck}
              onChange={() => changeCheckBox(index)}
            />
            {flagEdit !== index
              ? <>
                <p className={!item.isCheck ? "text" : "text-done"}>{item.text}</p>
                <button className="but-task" onClick={() => setFlagEdit(index)}>Edit</button>
                <button className="but-task" onClick={() => onClickDell(item._id)}>Delete</button>
                </>
              : <>
                <input type="text" className="edit-input"  onChange={(e) => setInputEdit(e.target.value)}/>
                <button className="but-task" onClick={() => (onClickEdit(index))}>Done</button>
                <button className="but-task" onClick={() => setFlagEdit('')}>Cancel</button>
                </>
            }
          </div>
        )
      }
      </div>
    </div>
  );
}

export default App;