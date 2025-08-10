// initialisation
let inputEl = document.querySelector("#js-task-title");
let addTaskButton = document.querySelector("#js-add-task-btn");
let listEl = document.querySelector("#js-task-list");

let tasks = []

// event listeners (state updation)
addTaskButton.addEventListener("click", function(event) {
    //stop the default form submission
    event.preventDefault();
    //update the state
    let newTask = {
        title: inputEl.value,
        isCompleted: false,
    };
    tasks.unshift(newTask); //inserts newTask at the start of tasks
    updateDOM();
});

// DOM updation (mapping state -> DOM)
function updateDOM() {
    listEl.innerHTML = ""; //sets newTask to blank so that it can be overwritten with a different task
    for(let i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");
        li.classList.add('task-item');
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type="checkbox";
        input.addEventListener('change', function() {
            if (input.checked) {
                input.parentElement.classList.add('completed');
            }
            else {
                    input.parentElement.classList.remove('completed');
            }
        })
        const button = document.createElement("button");
        button.textContent = "Remove";
        button.classList.add('remove');
        button.addEventListener('click', function() {
            tasks.splice(i,1); //removes task[i] from the array
            updateDOM(); //everytime updateDOM is called, the entire tasks array is displayed again - so updating it here displays it without task[i] 
        })
        label.textContent = tasks[i].title;
        label.prepend(input);
        li.append(label);
        li.append(button);
        console.log(li);
        listEl.append(li);
    }
    inputEl.value = ""; //input box is set to blank each time the add task button is cliked
}