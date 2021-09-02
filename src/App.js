import React, { useState, useEffect } from 'react';
import axios from 'axios';
import add from './images/add.png';
import edit from './images/edit.png';
import del from './images/Del.png';
import cancel from './images/cancel.png';
import done from './images/done.png';
import './App.scss';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [flagEdit, setFlagEdit] = useState('');
  const [inputEdit, setInputEdit] = useState('');
  tasks.sort((a, b) => a.isCheck - b.isCheck);

  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    });
  }, [setTasks])

  const onClickAdd = () => {
    if (!textInput.trim()) return alert('ERROR');
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

  const clickEdit = (item, index) => {
    setFlagEdit(index);
    setInputEdit(item.text);
  }

  const onClickDell = (_id) => {
    axios.delete(`http://localhost:8000/deleteTask?_id=${_id}`).then(res => {
      setTasks(res.data.data);
    });
  }

  const onClickDone = (index) => {
    if (!inputEdit.trim()) return alert('ERROR');
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
          placeholder="add task"
          onChange={(e) => setTextInput(e.target.value)}
          value={textInput}
        />
        <img src={add} alt='' className="img-add" onClick={() => onClickAdd()} />
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
                  <p className={`text  ${item.isCheck ? "text-done" : ""}`}>{item.text}</p>
                  {!item.isCheck
                    ? <img src={edit} alt='' className="img-but" onClick={() => clickEdit(item, index)}/>
                    : <div />}
                  <img src={del} alt='' className="img-but" onClick={() => onClickDell(item._id)} />
                </>
              : <>
                  <input type="text" className="edit-input"  value={inputEdit} onChange={(e) => setInputEdit(e.target.value)}/>
                  <img src={done} alt='' className="img-but" onClick={() => onClickDone(index)}/>
                  <img src={cancel} alt='' className="img-but" onClick={() => setFlagEdit('')}/>
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