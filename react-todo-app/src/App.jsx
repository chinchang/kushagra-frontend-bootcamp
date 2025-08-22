import { useState } from "react";
import "/src/index.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = (event) => {
    event.preventDefault();

    let newTask = {
      id: uuidv4(),
      title: taskTitle,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");
  };

  const handleTaskInput = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleRemoveTodo = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <>
      <header>
        <h1>React Todo App</h1>
      </header>
      <form>
        <input
          type="text"
          className="input"
          value={taskTitle}
          onInput={handleTaskInput}
        />
        <button disabled={!taskTitle.trim()} onClick={handleAddTask}>
          Add task
        </button>
      </form>

      {tasks.length === 0 ? (
        <p>ADD TASK</p>
      ) : (
        <ol className="task-list" id="js-task-list">
          {tasks.map(function (task) {
            return (
              <li>
                <label>
                  <input
                    checked={task.isCompleted}
                    onChange={() => handleToggleTask(task.id)}
                    type="checkbox"
                  />

                  <span
                    className={`${task.isCompleted ? "strikethrough" : ""}`}
                  >
                    {task.title}
                  </span>
                </label>

                <button onClick={() => handleRemoveTodo(task.id)} type="button">
                  Remove
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}

export default App;
