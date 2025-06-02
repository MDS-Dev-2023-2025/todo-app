import React from "react";
import styles from "../styles/components/TodoList.module.scss";
import TodoItem from "./TodoItem";
import RawTodoItem from "../models/RawTodoItem";

type Props = {
  todos: RawTodoItem[];
};

const TodoList = ({ todos }: Props) => {
  return (
    <section className={styles.container}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} title={todo.title} />
      ))}
    </section>
  );
};

export default TodoList;
