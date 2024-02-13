import axios from "axios";
import { Todo } from "./Todo";

const url = "https://jsonplaceholder.typicode.com/todos/1";

const logTodo = ({ title, id, completed }: Todo) =>
  console.log(
    `Todo '${id} - ${title}' is ${completed ? "completed" : "not competed"}`
  );

axios.get(url).then(res => {
  const todo: Todo = res.data;
  logTodo(todo);
});
