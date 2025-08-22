const btnAddTask = document.querySelector(".js-add-task");
const inputEl = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoTemplate = document.querySelector(".js-todo-template");

let todo_arr = [];

const updateDom = () => {
  todoList.innerHTML = "";
  if (todo_arr.length === 0) {
    const div = document.createElement("div");
    div.textContent = "PLEASE ADD TASKS!";
    div.className = "add-tasks";

    todoList.append(div);
  }

  todo_arr.forEach((todo_item) => {
    const li = todoTemplate.content.cloneNode(true);

    const checkbox = li.querySelector("input[type='checkbox']");
    const todoText = li.querySelector(".todo-text");
    const removeBtn = li.querySelector(".btn-remove");

    checkbox.checked = todo_item.isCompleted;
    todoText.textContent = todo_item.title;

    if (todo_item.isCompleted) {
      todoText.classList.add("strikethrough");
    }

    checkbox.addEventListener("change", (e) => {
      if (e.target.type === "checkbox") {
        const todoToUpdate = todo_arr.find(
          (item) => item.title === todo_item.title
        );
        todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
        if (todoToUpdate.isCompleted) {
          todoText.classList.add("strikethrough");
        } else {
          todoText.classList.remove("strikethrough");
        }
      }
    });

    removeBtn.addEventListener("click", () => {
      todo_arr = todo_arr.filter((todo) => todo.title !== todo_item.title);

      updateDom();
    });

    todoList.append(li);
  });
};

updateDom();

btnAddTask.disabled = true;

inputEl.addEventListener("input", () => {
  btnAddTask.disabled = inputEl.value.trim() === "";
});

const addNewTodo = (e) => {
  e.preventDefault();

  let newTodo = {
    title: inputEl.value,
    isCompleted: false,
  };
  todo_arr.unshift(newTodo);

  inputEl.value = "";

  updateDom();
  btnAddTask.disabled = true;
};

btnAddTask.addEventListener("click", addNewTodo);
