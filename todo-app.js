// initialization
let inputEl = document.querySelector("#js-task-title");
let addTaskButton = document.querySelector("#js-add-task-btn");
let listEl = document.querySelector("#js-task-list");
let todoTemplateEl = document.querySelector("#js-todo-template");

let tasks = [];

// event listener for addTask button (state updation)
addTaskButton.addEventListener("click", function (event) {
  // stop the default form submission
  event.preventDefault();

  // update the state
  let newTask = {
    title: inputEl.value,
    isCompleted: false,
  };
  tasks.unshift(newTask);
  inputEl.value = "";
  updateDom();
});

// event listener for Remove buttons
listEl.addEventListener("click", function (event) {
  // Check if the clicked element is a "Remove" button
  if (event.target.classList.contains("js-remove-btn")) {
    const li = event.target.closest(".js-task-list-item");
    const index = parseInt(li.dataset.index, 10);
    // Remove the task from the tasks array
    tasks.splice(index, 1);
    updateDom();
  }
});

// event listener for checkbox changes
listEl.addEventListener("change", function (event) {
  // Check if the changed element is a checkbox
  if (event.target.classList.contains("js-task-checkbox")) {
    const li = event.target.closest(".js-task-list-item");
    const index = parseInt(li.dataset.index, 10);
    // Update the task state
    tasks[index].isCompleted = event.target.checked;
  }
});

// DOM updation (mapping state -> DOM)
function updateDom() {
  listEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const clone = todoTemplateEl.content.cloneNode(true);
    const li = clone.querySelector(".js-task-list-item");
    li.dataset.index = i;

    const checkbox = clone.querySelector(".js-task-checkbox");
    checkbox.id = `task-${i}`;
    checkbox.checked = tasks[i].isCompleted;

    const label = clone.querySelector(".js-task-label");
    label.htmlFor = checkbox.id;
    label.textContent = tasks[i].title;

    listEl.append(li);
  }
}