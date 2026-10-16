export default function FilterBar({ filter, onFilterChange }) {
  const filters = [
    { value: "all", label: "Toutes" },
    { value: "active", label: "Actives" },
    { value: "completed", label: "Terminées" },
  ];

  return (
    <div className="filters">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          className={filter === value ? "selected" : ""}
          aria-pressed={filter === value}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}