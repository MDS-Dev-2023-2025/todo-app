import React from "react";
import styles from "../styles/pages/Home.module.scss";
import TodoList from "../components/TodoList";
import RawTodoItem from "../models/RawTodoItem";

const HomePage = () => {
  const todos = [
    new RawTodoItem("1", "Item 1", "Description item 1"),
    new RawTodoItem("2", "Item 2", "Description item 2"),
    new RawTodoItem("3", "Item 3", "Description item 3"),
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Todo App</h1>
      <TodoList todos={todos} />
    </main>
  );
};

export default HomePage;
