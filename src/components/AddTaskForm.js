import "./AddTaskForm.css";
import ErrorModal from "./ErrorModal";
import { useState } from "react";

function AddTaskForm(props) {
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState();

  const inputTaskChangeHandler = (event) => {
    setNewTask(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newTaskData = {
      title: newTask,
      isCompleted: false,
    };
    console.log(newTask);
    if (newTask.trim().length === 0) {
      setError({
        title: "No task entered",
        message: "Please enter a valid input (must be non-empty)"
      })
      return;
    }
    setNewTask("");
    props.onSaveTaskHandler(newTaskData);
  };

  const errorHandler = () => {
    setError(null)
  }

  return (
    <div>
      {error &&<ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <div className="footer">
        <form onSubmit={onSubmitHandler} className="add-task-container">
          <input
            onChange={inputTaskChangeHandler}
            className="input-text-field"
            type="text"
            value={newTask}
          />
          <button className="btn-add-task" type="submit">
            Add task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskForm;
