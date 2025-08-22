const btnAddTaskEl = document.querySelector(".btn-add-task");
const inputEl = document.querySelector(".todo-input");
const todoListEl = document.querySelector(".todo-list");
const todoTemplateEl = document.querySelector(".js-todo-template");

let todos = [];

const updateDom = () => {
  todoListEl.innerHTML = "";
  if (todos.length === 0) {
    const div = document.createElement("div");
    div.textContent = "PLEASE ADD TASKS!";
    div.className = "add-tasks";

    todoListEl.append(div);
  }

  todos.forEach((todo_item) => {
    const li = todoTemplateEl.content.cloneNode(true);

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
        const todoToUpdate = todos.find(
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
      todos = todos.filter((todo) => todo.id !== todo_item.id);

      updateDom();
    });

    todoListEl.append(li);
  });
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
};

const addNewTodo = (e) => {
  e.preventDefault();

  let newTodo = {
    id: generateId(),
    title: inputEl.value,
    isCompleted: false,
  };
  todos.unshift(newTodo);

  inputEl.value = "";

  updateDom();
  btnAddTaskEl.disabled = true;
};

updateDom();

btnAddTaskEl.disabled = true;

inputEl.addEventListener("input", () => {
  btnAddTaskEl.disabled = inputEl.value.trim() === "";
});

btnAddTaskEl.addEventListener("click", addNewTodo);
