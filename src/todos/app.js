import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos, renderPending } from "./use-cases";

const elementIds = {
  Todolist: ".todo-list",
  NewTodoInput: "#new-todo-input",
  ClearCompleted: ".clear-completed",
  todoFilter: ".filter",
  pendingCount: "#pending-count",
};

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodo(todoStore.getCurrentFilter());
    renderPending(elementIds.pendingCount);
    renderTodos(elementIds.Todolist, todos);
  };

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // html references

  const newDescriptionInput = document.querySelector(elementIds.NewTodoInput);
  const todoListUl = document.querySelector(elementIds.Todolist);
  const deleteAllTodo = document.querySelector(elementIds.ClearCompleted);
  const selectFilterUl = document.querySelectorAll(elementIds.todoFilter);

  // Listeners

  newDescriptionInput.addEventListener("keyup", (e) => {
    if (e.keyCode !== 13) return;
    if (e.target.value.trim().length === 0) return;
    todoStore.addTodo(e.target.value);
    displayTodos();
    e.target.value = "";
  });

  todoListUl.addEventListener("click", (e) => {
    const element = e.target.closest("[data-id]");
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUl.addEventListener("click", (e) => {
    const elementClass = e.target.className == "destroy";
    const element = e.target.closest("[data-id]");
    if (!elementClass || !element) return;
    todoStore.deleteTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  deleteAllTodo.addEventListener("click", () => {
    todoStore.deleteCompletedTodo();
    displayTodos();
  });

  selectFilterUl.forEach((element) => {
    element.addEventListener("click", (element) => {
      selectFilterUl.forEach((el) => el.classList.remove("selected"));
      element.target.classList.add("selected");

      switch (element.target.text) {
        case "Todos":
          todoStore.setSelectedFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setSelectedFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setSelectedFilter(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });
};
