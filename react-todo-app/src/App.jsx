import { useState, useEffect } from "react";
import "/src/index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  function handleAddTask(event) {
    event.preventDefault();

    // update the state
    let newTask = {
      title: taskTitle,
      isCompleted: false,
    };

    console.log("old", tasks);

    tasks.unshift(newTask);
    const newTasks = [...tasks];

    console.log("new", tasks);
    setTasks(newTasks);
  }

  function handleTaskInput(event) {
    console.log("input fired");
    setTaskTitle(event.target.value);
  }

  return (
    <>
      <header>
        <h1>Best TODO App</h1>
      </header>

      <form>
        <input
          type="text"
          className="input"
          value={taskTitle}
          onInput={handleTaskInput}
        />
        <button onClick={handleAddTask}>Add task</button>
      </form>

      <ol id="js-task-list">
        {tasks.map(function (task) {
          return (
            <li>
              <label>
                <input type="checkbox" />
                {task.title}
              </label>

              <button type="button">Remove</button>
            </li>
          );
        })}
      </ol>
    </>
  );
}

export default App;
