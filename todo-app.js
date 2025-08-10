const btnAddTask = document.querySelector(".js-add-task");
const inputEl = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

let todo_arr = [
  //   { title: "abc", isCompleted: true },
  //   { title: "xyz", isCompleted: true },
  //   { title: "ijk", isCompleted: true },
];

const updateDom = () => {
  console.log("first");
  todoList.innerHTML = "";
  if (todo_arr.length === 0) {
    console.log("todoList.innerHTML", todoList.innerHTML);
    const div = document.createElement("div");
    div.textContent = "PLEASE ADD TASKS!";
    div.className = "add-tasks";

    todoList.append(div);
  }
  todo_arr.map((todo_item) => {
    const li = document.createElement("li");
    li.className = "todo-list-item";

    const label = document.createElement("label");
    label.textContent = todo_item.title;

    label.className = todo_item.isCompleted
      ? "clickable strikethrough"
      : "clickable";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = todo_item.title;
    input.value = input.name;
    input.checked = todo_item.isCompleted;

    input.addEventListener("change", (e) => {
      if (e.target.type === "checkbox") {
        const todoToUpdate = todo_arr.find(
          (item) => item.title === todo_item.title
        );
        todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
        if (todoToUpdate.isCompleted) {
          label.className = "strikethrough";
        } else {
          label.className = "";
        }
        console.log("todoToUpdate", todoToUpdate);
      }
      updateDom();
    });

    var btnRemove = document.createElement("button");
    btnRemove.className = "btn-remove clickable btns";
    btnRemove.type = "button";
    btnRemove.textContent = "Remove";

    btnRemove.addEventListener("click", () => {
      todo_arr = todo_arr.filter((todo) => todo.title !== todo_item.title);

      console.log(todo_arr);

      updateDom();
    });

    li.append(label);
    li.append(btnRemove);
    label.prepend(input);
    todoList.append(li);
    console.log(li);
  });
};

updateDom();

btnAddTask.disabled = true;

inputEl.addEventListener("input", () => {
  btnAddTask.disabled = false;
});

addNewTodo = (e) => {
  e.preventDefault();
  console.log("llllll");

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
