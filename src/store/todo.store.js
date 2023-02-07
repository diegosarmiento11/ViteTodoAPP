import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "All",
  Completed: "Completed",
  Pending: "Pending",
};

const state = {
  todos: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del marfil"),
    new Todo("Piedra del mar"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
};

const loadStore = () => {
  if (!localStorage.getItem("state")) return;
  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("state")
  );
  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocaleStorage = () => {
  localStorage.setItem("state", JSON.stringify(state));
};

const getTodo = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`Option ${filter} not enabled`);
  }
};

const addTodo = (description) => {
  if (!description) {
    throw new Error("Not implemented");
  }
  state.todos.push(new Todo(description));
  saveStateToLocaleStorage();
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  saveStateToLocaleStorage();
};

const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });
  saveStateToLocaleStorage();
};

const deleteCompletedTodo = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveStateToLocaleStorage();
};

const setSelectedFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
};

const getCurrentFilter = () => {
  saveStateToLocaleStorage();
  return state.filter;
};

export default {
  addTodo,
  deleteCompletedTodo,
  deleteTodo,
  getCurrentFilter,
  getTodo,
  initStore,
  loadStore,
  setSelectedFilter,
  toggleTodo,
};
