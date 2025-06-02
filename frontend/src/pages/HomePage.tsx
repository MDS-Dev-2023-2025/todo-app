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
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = (title: string, description: string) => {
    const newId = (todos.length + 1).toString();
    const newTodo = new RawTodoItem(newId, title, description);
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Todo App</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      
      <div className={styles.filterContainer}>
        <button 
          data-cy="filter-all"
          className={filter === 'all' ? styles.activeFilter : ''}
          onClick={() => setFilter('all')}
        >
          Toutes
        </button>
        <button 
          data-cy="filter-active"
          className={filter === 'active' ? styles.activeFilter : ''}
          onClick={() => setFilter('active')}
        >
          Actives
        </button>
        <button 
          data-cy="filter-completed"
          className={filter === 'completed' ? styles.activeFilter : ''}
          onClick={() => setFilter('completed')}
        >
          Terminées
        </button>
      </div>

      <TodoList 
        todos={filteredTodos} 
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </main>
  );
};

export default HomePage;
