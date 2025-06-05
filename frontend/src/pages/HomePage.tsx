import { useEffect, useState } from "react";
import styles from "../styles/pages/Home.module.scss";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import RawTodoItem from "../models/RawTodoItem";

const HomePage = () => {
  const [todos, setTodos] =useState<RawTodoItem[]>([]);

  const handleAddTodo = (title: string) => {
    const newId = (todos.length + 1).toString();
    const newTodo = new RawTodoItem(newId, title);
    setTodos([...todos, newTodo]);
    fetch(`${process.env.REACT_APP_REQUEST_BASE}/`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        title
      }),
    });
  };

  useEffect(()=>{
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_REQUEST_BASE}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const todoItems = data.map(
          (item: { id: string; title: string }) => new RawTodoItem(item.id, item.title)
        );

        setTodos(todoItems);
      } catch (error) {
        console.error("Erreur lors du chargement des todos :", error);
      }
    };

    fetchTodos();
  },[])

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Todo App</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </main>
  );
};

export default HomePage;
