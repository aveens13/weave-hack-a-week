import { useState, useRef, useEffect } from "react";
import RectangleIcon from "@mui/icons-material/Rectangle";
import TaskCard from "./Taskcard";
export default function Board({ taskInfo }) {
  const [tasks, setTasks] = useState(taskInfo);

  //This changes the task's status
  function handleEvent(id, status) {
    fetch(`/api/updatetask/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    });
    setTasks((prev) => {
      const newTasks = [];
      for (let i = 0; i < prev.length; i++) {
        const currentTask = prev[i];
        if (currentTask.taskId == id) {
          const updatedTask = { ...currentTask, status: status };
          newTasks.push(updatedTask);
        } else {
          newTasks.push(currentTask);
        }
      }
      console.log(newTasks);
      return newTasks;
    });
  }

  return (
    <div className="board--section">
      <nav>
        <ul>
          <li>
            <div className="top-section">
              <RectangleIcon />
              <p>TO DO</p>
            </div>
            <div className="task-card">
              {tasks.map(
                (task) =>
                  task.status == "created" && (
                    <TaskCard task={task} handleMe={handleEvent} />
                  )
              )}
            </div>
          </li>
          <li>
            <div className="top-section">
              <RectangleIcon />
              <p>IN PROGRESS</p>
            </div>
            <div className="task-card">
              {tasks.map(
                (task) =>
                  task.status == "progress" && (
                    <TaskCard task={task} handleMe={handleEvent} />
                  )
              )}
            </div>
          </li>
          <li>
            <div className="top-section">
              <RectangleIcon />
              <p>Done</p>
            </div>
            <div className="task-card">
              {tasks.map(
                (task) =>
                  task.status == "completed" && (
                    <TaskCard task={task} handleMe={handleEvent} />
                  )
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
