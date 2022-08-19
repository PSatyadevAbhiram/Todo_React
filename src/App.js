import "./App.css";
import AddTask from "./components/AddTask";
import DateComponent from "./components/DateComponent";

function App() {

  let tasks = []

  const addTaskToList = taskData => {
    tasks.push(taskData)
    console.log(tasks)
  }

  return (
    <div className="App">
      <DateComponent/>
      <AddTask onTaskAddedHandler = {addTaskToList} />
    </div>
  )
}

export default App;
