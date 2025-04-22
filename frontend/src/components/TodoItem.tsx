import React from "react";
import styles from "../styles/components/TodoItem.module.scss";

type Props = {
  title: string;
};

const TodoItem = ({ title }: Props) => {
  return (
    <section className={styles.container}>
      <input type="checkbox" id="scales" name="scales" />
      <p className={styles.title}>{title}</p>
    </section>
  );
};

export default TodoItem;
