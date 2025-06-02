import React, { useState } from "react";
import styles from "../styles/components/TodoForm.module.scss";

type Props = {
  onAddTodo: (title: string, description: string) => void;
};

const TodoForm = ({ onAddTodo }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Ajouter une nouvelle tâche</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="todo-title" className={styles.label}>
            Titre *
          </label>
          <input
            id="todo-title"
            data-cy="todo-title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez le titre de la tâche..."
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="todo-description" className={styles.label}>
            Description
          </label>
          <textarea
            id="todo-description"
            data-cy="todo-description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ajoutez une description (optionnel)..."
            className={styles.textarea}
            rows={3}
          />
        </div>

        <button
          type="submit"
          data-cy="submit-todo-button"
          className={styles.submitButton}
          disabled={!title.trim()}
        >
          <span className={styles.buttonIcon}>+</span>
          Ajouter la tâche
        </button>
      </form>
    </section>
  );
};

export default TodoForm;
