// initialization
let inputEl = document.querySelector("#js-task-title");
let addTaskButton = document.querySelector("#js-add-task-btn");
let listEl = document.querySelector("#js-task-list");

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
  if (event.target.classList.contains("remove-btn")) {
    // Find the parent <li> and its index
    const li = event.target.closest("li");
    const index = Array.from(listEl.children).indexOf(li);

    // Remove the task from the tasks array
    tasks.splice(index, 1);

    updateDom();
  }
});

// Event listener for checkbox changes
listEl.addEventListener("change", function (event) {
  // Check if the changed element is a checkbox
  if (event.target.type === "checkbox") {
    // Find the parent <li> and its index
    const li = event.target.closest("li");
    const index = Array.from(listEl.children).indexOf(li);

    // Update the task state
    tasks[index].isCompleted = event.target.checked;
  }
});

// DOM updation (mapping state -> DOM)

function updateDom() {
  listEl.innerHTML = "";
  // map state to DOM

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = tasks[i].isCompleted;
    input.id = `task-${i}`;
    
    const label = document.createElement("label");
    label.textContent = tasks[i].title;
    label.prepend(input);
    label.htmlFor = input.id;
    
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.classList.add("remove-btn");

    li.append(input,label,button);

    console.log(li);

    listEl.append(li);
  }
}
