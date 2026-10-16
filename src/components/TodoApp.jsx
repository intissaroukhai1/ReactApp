import { useEffect, useMemo, useReducer, useState } from "react";

import TodoForm from "./TodoForm";
import FilterBar from "./FilterBar";
import TodoList from "./TodoList";
import useLocalStorage from "../hooks/useLocalStorage";

const initialTodos = [
  { id: "1", text: "Revoir useState", completed: true },
  { id: "2", text: "Coder le reducer", completed: false },
  { id: "3", text: "Ajouter useLocalStorage", completed: false },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.todo];

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
}

export default function TodoApp() {
  const [savedTodos, setSavedTodos] = useLocalStorage(
    "todo-app-tasks",
    initialTodos
  );

  const [todos, dispatch] = useReducer(todoReducer, savedTodos);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setSavedTodos(todos);
  }, [todos, setSavedTodos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);

      case "completed":
        return todos.filter((todo) => todo.completed);

      default:
        return todos;
    }
  }, [todos, filter]);

  const remaining = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  function addTodo(text) {
    dispatch({
      type: "ADD",
      todo: {
        id: crypto.randomUUID(),
        text,
        completed: false,
      },
    });
  }

  return (
    <section className="todo-card">
      <h2>Mes tâches</h2>

      <TodoForm onAdd={addTodo} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
      />

      <TodoList
        todos={filteredTodos}
        onToggle={(id) => dispatch({ type: "TOGGLE", id })}
        onDelete={(id) => dispatch({ type: "DELETE", id })}
      />

      <p className="counter" aria-live="polite">
        {remaining} tâche{remaining !== 1 ? "s" : ""} restante
        {remaining !== 1 ? "s" : ""}
      </p>
    </section>
  );
}