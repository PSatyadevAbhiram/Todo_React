import AddTaskForm from "./AddTaskForm";

function AddTask(props){

  const saveNewTask = (newTask) => {
    const newTaskData = {
      ...newTask,
      id : Math.random().toString(),
      isCompleted : false
    }
    props.onTaskAddedHandler(newTaskData);
  }

  return (
    <div>
      <AddTaskForm onSaveTaskHandler = {saveNewTask}/>
    </div>
  )
}

export default AddTask;