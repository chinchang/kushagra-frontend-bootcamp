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

    tasks.unshift(newTask);
    
    const newTasks = [...tasks];
    setTasks(newTasks);
    setTaskTitle(''); // Clear the input field 
  }

  function handleTaskInput(event) {
    setTaskTitle(event.target.value);
  }

  // function to remove a task
  function handleRemoveTask(index) {
    const newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (i !== index) {
        newTasks.push(tasks[i]);
      }
    }
    setTasks(newTasks); // Update tasks state
  }

  // function to handle checkbox
  function handleToggleTask(index, event) {
    const newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (i === index) {
        const newIsCompleted = event.target.checked;
        newTasks.push({
          title: tasks[i].title,
          isCompleted: newIsCompleted
        });
      } else {
        // Copy task unchanged
        newTasks.push(tasks[i]);
      }
    }
    setTasks(newTasks); // Update tasks state
  }

  return (
    <>
      <header>
        <h1 className="header">React TODO App</h1>
      </header>

      <form className="todo-form">
        <input
          type="text"
          className="input"
          value={taskTitle}
          onInput={handleTaskInput}
        />
        <button onClick={handleAddTask}>Add task</button>
      </form>

      <ol className="task-list" id="js-task-list">
        {tasks.map(function (task, index) {
          return (
            <li className="js-task-list-item" key={index}>
              <label className="js-task-label">
                <input 
                type="checkbox" 
                className="js-task-checkbox"
                checked={task.isCompleted}
                  onChange={function(event) {
                    handleToggleTask(index, event);
                  }}                
                />
                <span className="js-task-title">{task.title}</span>
              </label>

              <button 
              type="button" 
              className="js-remove-btn"
              onClick={function() {
                  handleRemoveTask(index);
                }}              
              >Remove</button>
            </li>
          );
        })}
      </ol>
    </>
  );
}

export default App;
