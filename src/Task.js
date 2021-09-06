import React from 'react';
import { useHistory } from 'react-router-dom';
import edit from './images/edit.png';
import del from './images/Del.png';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';

const Task = ({ item, index, tasks, setTasks, setTaskText }) => {
  let history = useHistory();

  const editFunck = (index) => {
    history.push(`/edit/${tasks[index]._id}`)
    setTaskText(tasks[index].text)
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

  return (
    <>
      <Checkbox
        icon={ <FavoriteBorder /> }
        checkedIcon={ <Favorite /> }
        checked={item.isCheck}
        onChange={() => changeCheckBox(index)}
      />
      <p className={`text ${item.isCheck ? "text-done" : ""}`}>{item.text}</p>
      {!item.isCheck && <img src={edit} alt='' className="img-but" onClick={() =>editFunck(index) }/>}
      <img src={del} alt='' className="img-but" onClick={() => onClickDell(item._id)} />
    </>
  )
}

export default Task;