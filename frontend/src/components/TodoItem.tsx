import React from "react";
import styles from "../styles/components/TodoItem.module.scss";
import RawTodoItem from "../models/RawTodoItem";

type Props = {
  todo: RawTodoItem;
  onToggle: (id: string) => void;
  onDelete: (id :string) => void;
};

const TodoItem = ({ todo, onToggle, onDelete }: Props) => {
  return (
    <section className={styles.container} data-cy="todo-item">
      <input
        type="checkbox"
        data-cy="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <div className={styles.content}>
        <p className={`${styles.title} ${todo.completed ? styles.completed : ''}`} data-cy="todo-title">
          {todo.title}
        </p>
      </div>
      <button
        className={styles.deleteButton}
        data-cy="delete-todo-button"
        onClick={() => onDelete(todo.id)}
      >
        ×
      </button>
    </section>
  );
};

export default TodoItem;
