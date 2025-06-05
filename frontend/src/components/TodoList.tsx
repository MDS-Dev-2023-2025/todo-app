import React from "react";
import styles from "../styles/components/TodoList.module.scss";
import TodoItem from "./TodoItem";
import RawTodoItem from "../models/RawTodoItem";

type Props = {
  todos: RawTodoItem[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }: Props) => {
  return (
    <section className={styles.container} data-cy="todo-list">
      {todos.length === 0 ? (
        <p data-cy="empty-state">Aucune tâche pour le moment</p>
      ) : (
        todos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            todo={todo}
            onToggle={() => onToggleTodo(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
          />
        ))
      )}
    </section>
  );
};

export default TodoList;
