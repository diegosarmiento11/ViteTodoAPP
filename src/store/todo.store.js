import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "All",
  Completed: "Completed",
  Pending: "Pending",
};

const state = {
  todo: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del marfil"),
    new Todo("Piedra del mar"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  console.log(state);
  console.log("init store ");
};

export default { initStore };
