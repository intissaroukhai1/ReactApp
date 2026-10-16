import { useRef, useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim()) return;

    onAdd(text.trim());
    setText("");
    inputRef.current?.focus();
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Nouvelle tâche..."
        aria-label="Nouvelle tâche"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <button type="submit" disabled={!text.trim()}>
        Ajouter
      </button>
    </form>
  );
}