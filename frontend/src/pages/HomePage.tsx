import { useEffect, useState } from "react";
import styles from "../styles/pages/Home.module.scss";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import RawTodoItem from "../models/RawTodoItem";

const HomePage = () => {
  const [todos, setTodos] =useState<RawTodoItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = (title: string) => {
    fetch(`${process.env.REACT_APP_REQUEST_BASE}/`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        title
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newId = (todos.length + 1).toString();
      const newTodo = new RawTodoItem(newId, title);
      setTodos([...todos, newTodo]);
    }).catch((error) => {
      console.error("Erreur lors de l'ajout du todo :", error);
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

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = async (id: string) => {
    try {
        await fetch(`${process.env.REACT_APP_REQUEST_BASE}/`+id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }).then(() => setTodos(todos.filter(todo => todo.id !== id))).catch((error) => {
          console.error("Erreur lors de la suppression du todo :", error);
        });
      } catch (error) {
        console.error("Erreur lors du chargement des todos :", error);
      }
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
