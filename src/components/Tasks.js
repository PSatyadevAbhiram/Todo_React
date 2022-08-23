import TaskItem from "./TaskItem";
import Card from "./Card";

function Tasks(props) {
  const taskCompletedHandler = (id) => {props.onTaskCompletedHandler(id)}
  return (
    <div>
      <Card className="tasks">
        {props.items.map((task) => (
          <TaskItem 
            onTaskCompleted = {taskCompletedHandler}
            key={task.id}
            title={task.title}
            isCompleted = {task.isCompleted}
            taskId = {task.id}
          />
        ))}
      </Card>
    </div>
  );
}

export default Tasks;
