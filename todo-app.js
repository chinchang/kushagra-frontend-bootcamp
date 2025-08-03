// initialization
let inputEl = document.querySelector("#js-task-title");
let addTaskButton = document.querySelector("#js-add-task-btn");
let listEl = document.querySelector("#js-task-list");

let taskTitle = "some task";
let tasks = [];

// event listeners (state updation)
addTaskButton.addEventListener("click", function (event) {
  // stop the default form submission
  event.preventDefault();

  // update the state
  let newTask = {
    title: inputEl.value,
    isCompeleted: false,
  };

  tasks.unshift(newTask);

  updateDom();
});

// DOM updation (mapping state -> DOM)

function updateDom() {
  // map state to DOM

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    label.textContent = tasks[i].title;
    label.prepend(input);
    const button = document.createElement("button");
    button.textContent = "Remove";
    li.append(label);
    li.append(button);

    console.log(li);

    listEl.append(li);
  }
}
