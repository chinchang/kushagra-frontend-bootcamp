// initialization
let inputEl = document.querySelector("#js-task-title");
let addTaskButton = document.querySelector("#js-add-task-btn");
let listEl = document.querySelector("#js-task-list");
let tasks = [];

// fetch initial todos since we don't have a db connected
async function fetchInitialTodos() {
  try {
    response = await fetch('https://dummyjson.com/todos?limit=5');
    data = await response.json();
    
    // API gives a data in different format, so we need to map it to our tasks structure
    tasks = data.todos.map(function(todo) {
      return {
        title: todo.todo,
        isCompleted: todo.completed
      };
    });
    
    updateDom();
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
}

fetchInitialTodos();

// event listeners (state updation)
addTaskButton.addEventListener("click", function (event) {
  // stop the default form submission
  event.preventDefault();

  if (inputEl.value.trim() === "") {
    alert("Task title cannot be empty");
    return;
  }

  // update the state
  let newTask = {
    title: inputEl.value,
    isCompleted: false,
  };

  tasks.unshift(newTask);
  inputEl.value = "";
  updateDom();
});

listEl.addEventListener("click", function(event) {
  if (event.target.classList.contains("js-task-checkbox")) {
    const taskIndex = Array.from(listEl.children).indexOf(event.target.closest("li"));
    tasks[taskIndex].isCompleted = event.target.checked;
  } else if (event.target.classList.contains("js-remove-btn")) {
    const taskIndex = Array.from(listEl.children).indexOf(event.target.closest("li"));
    tasks.splice(taskIndex, 1);
    updateDom();
  }
});

// DOM updation (mapping state -> DOM)
function updateDom() {
  // map state to DOM
  listEl.innerHTML = "";
  const template = document.querySelector("#js-todo-template");
  
  for (let i = 0; i < tasks.length; i++) {
    const clone = template.content.cloneNode(true);
    
    const input = clone.querySelector(".js-task-checkbox");
    const label = clone.querySelector(".js-task-label");
    
    input.checked = tasks[i].isCompleted;
    label.textContent = tasks[i].title;
    
    listEl.appendChild(clone);
  }
}
