import React, { useState } from "react";
import styles from "../styles/pages/Home.module.scss";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import RawTodoItem from "../models/RawTodoItem";

const HomePage = () => {
  const [todos, setTodos] = useState([
    new RawTodoItem("1", "Item 1", "Description item 1"),
    new RawTodoItem("2", "Item 2", "Description item 2"),
    new RawTodoItem("3", "Item 3", "Description item 3"),
  ]);

  const handleAddTodo = (title: string, description: string) => {
    const newId = (todos.length + 1).toString();
    const newTodo = new RawTodoItem(newId, title, description);
    setTodos([...todos, newTodo]);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Todo App</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </main>
  );
};

export default HomePage;