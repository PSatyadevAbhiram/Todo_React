import { useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";

let initial_tasks = [];

function App() {
  const [tasks, setTasks] = useState(initial_tasks);
  let [updated_tasks, deleteTasks] = useState(tasks);

  const addTaskToList = (tasks) => {
    setTasks((prevTasks) => {
      return [tasks, ...prevTasks];
    });
  };

  const removeTaskFromList = (id) => {
    var index = tasks.findIndex(function(o) {
      return o.id = id
    })
    if(index !== -1){
      tasks.splice(index,1)
    }
    updated_tasks = tasks
    deleteTasks(() => {
      return [updated_tasks]
    });
  };

  return (
    <div className="App">
      <Tasks items={tasks} onTaskCompletedHandler={removeTaskFromList} />
      <AddTask onTaskAddedHandler={addTaskToList} />
    </div>
  );
}

export default App;
