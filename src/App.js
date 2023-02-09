import React, { useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Login from "./components/LoginPage";

let initial_tasks = [];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginHandler = (username, password) => {
    setIsLoggedIn(true);
  };
  const [tasks, setTasks] = useState(initial_tasks);
  let [updated_tasks, deleteTasks] = useState(tasks);

  const addTaskToList = (tasks) => {
    setTasks((prevTasks) => {
      return [tasks, ...prevTasks];
    });
  };

  const removeTaskFromList = (id) => {
    var toRemoveInd = 0;
    for (var itr in tasks) {
      if (tasks[itr].id === id) {
        break;
      }
      toRemoveInd++;
    }
    tasks.splice(toRemoveInd, 1);
    updated_tasks = tasks;
    deleteTasks(() => {
      return [updated_tasks];
    });
  };

  return (
    <React.Fragment>
      <div>
        {!isLoggedIn && <Login onLogin={loginHandler}/>}
        {isLoggedIn && 
        <div className="App"> <Tasks items={tasks} onTaskCompletedHandler={removeTaskFromList} /> <AddTask onTaskAddedHandler={addTaskToList} />  </div>}
      </div>
    </React.Fragment>
  );
}

export default App;
