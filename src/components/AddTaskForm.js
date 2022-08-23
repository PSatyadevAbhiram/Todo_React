import "./AddTaskForm.css";
import {useState} from 'react';

function AddTaskForm(props) {

  const [newTask, setNewTask] = useState('');

  const inputTaskChangeHandler = event => {
    setNewTask(event.target.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newTaskData = {
      title : newTask,
      isCompleted : false
    }
    setNewTask('');
    props.onSaveTaskHandler(newTaskData);
  }
  
  return (
    <div className='footer'>
      <form onSubmit={onSubmitHandler} className='add-task-container'>
        <input onChange={inputTaskChangeHandler} className='input-text-field' type="text" value={newTask} />
        <button className='btn-add-task' type="submit">Add task</button>
      </form>
    </div>
  );
}

export default AddTaskForm;
