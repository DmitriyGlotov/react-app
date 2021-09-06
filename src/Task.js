import React from 'react';
import { useHistory } from 'react-router-dom';
import edit from './images/edit.png';
import del from './images/Del.png';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';

const Task = ({ tasks, setTasks, setTaskText }) => {
  const history = useHistory();

  const editFunck = (_id, text) => {
    history.push(`/edit/${_id}`)
    setTaskText(text)
  }

  const changeCheckBox = (_id, isCheck) => {

    axios.patch('http://localhost:8000/updateTask', { _id, isCheck: !isCheck }).then(res => {
      setTasks(res.data.data);
    });
  }

  const onClickDell = (_id) => {
    axios.delete(`http://localhost:8000/deleteTask?_id=${_id}`).then(res => {
      setTasks(res.data.data);
    });
  }

  return (
    tasks.map((item, index) => {
      const {text, isCheck, _id} = item;

      return (
        <div key={`task-${index}`} className="task">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={isCheck}
            onChange={() => changeCheckBox(_id, isCheck)}
          />
          <p className={`text ${isCheck ? "text-done" : ""}`}>{text}</p>
          { !item.isCheck && <img src={edit} alt='' className="img-but" onClick={() =>editFunck(_id, text) }/>}
          <img src={del} alt='' className="img-but" onClick={() => onClickDell(_id)} />
        </div>
      )
    })
  )
}

export default Task;