import React, {useState} from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import cancel from './images/cancel.png';
import done from './images/done.png';

const TaskEdit = ({ setTasks, taskText }) => {
  const [inputEdit, setInputEdit] = useState(taskText);
  const _id = useRouteMatch('/edit/:id').params.id;

  const onClickDone = () => {
    if (!inputEdit.trim()) return alert('ERROR');

    axios.patch('http://localhost:8000/updateTask', { _id, text: inputEdit }).then(res => {
      setTasks(res.data.data);
    });

    setInputEdit('');
  }

  return (
    <div className="task">
      <input type="text" className="edit-input"  value={inputEdit} onChange={(e) => setInputEdit(e.target.value)}/>
      <Link to='/home'><img src={done} alt='' className="img-but" onClick={() => onClickDone()}/></Link>
      <Link to='/home'><img src={cancel} alt='' className="img-but" /></Link>
    </div>
  )
}

export default TaskEdit;