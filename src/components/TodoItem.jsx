export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <span className={todo.completed ? "completed" : ""}>
          {todo.text}
        </span>
      </label>

      <button
        className="delete-button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Supprimer : ${todo.text}`}
      >
        Supprimer
      </button>
    </li>
  );
}