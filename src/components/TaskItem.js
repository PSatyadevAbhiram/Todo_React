import "./TaskItem.css";
import Card from "./Card";
import DateComponent from "./DateComponent";

function TaskItem(props) {
    const onCompletedEventHandler = () => {
        props.onTaskCompleted(props.taskId)
    }
  return (
    <Card className="task-item">
      <DateComponent />
      <div className="task-item__description">
        <h2>{props.title}</h2>
      </div>
      <button onClick={onCompletedEventHandler}>Completed</button>
    </Card>
  );
}

export default TaskItem;
