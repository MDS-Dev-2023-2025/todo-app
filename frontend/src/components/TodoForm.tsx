import React, { useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <section>
      <h2>Formulaire d'ajout</h2>
    </section>
  );
};

export default TodoForm;
