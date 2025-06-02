import React from "react";
import styles from "../styles/components/TodoItem.module.scss";
import RawTodoItem from "../models/RawTodoItem";

type Props = {
  todo: RawTodoItem;
  onToggle: () => void;
  onDelete: () => void;
};

const TodoItem = ({ todo, onToggle, onDelete }: Props) => {
  return (
    <section className={styles.container} data-cy="todo-item">
      <input 
        type="checkbox" 
        data-cy="todo-checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <div className={styles.content}>
        <p className={`${styles.title} ${todo.completed ? styles.completed : ''}`} data-cy="todo-title">
          {todo.title}
        </p>
        {todo.description && (
          <p className={styles.description} data-cy="todo-description">
            {todo.description}
          </p>
        )}
      </div>
      <button 
        className={styles.deleteButton}
        data-cy="delete-todo-button"
        onClick={onDelete}
      >
        ×
      </button>
    </section>
  );
};

export default TodoItem;
