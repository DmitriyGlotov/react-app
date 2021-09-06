import React, { useState, useEffect } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import add from './images/add.png';
import TaskEdit from './TaskEdit';
import Task from './Task';

import './App.scss';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [taskText, setTaskText] = useState('');

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
          <Switch>
            <Route path='/home'>
                {
                  tasks.map((item, index) =>
                    <div key={`task-${index}`} className="task">
                      <Task
                        tasks={tasks}
                        item={item}
                        index={index}
                        setTasks={setTasks}
                        setTaskText={setTaskText}
                      />
                    </div>
                  )
                }
            </Route>
            <Route path='/edit/:id'>
              <TaskEdit
                setTasks={setTasks}
                taskText={taskText}
              />
            </Route>
            <Redirect from='/' to='home' />
          </Switch>
      </div>
    </div>
  );
}

export default App;