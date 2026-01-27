import { List, Clock, CheckCircle } from "lucide-react";

const TodoFilter = ({ filter, stats, onFilterChange }) => {
  const filters = [
    { key: "all", label: "All", icon: List, count: stats.total },
    { key: "active", label: "Active", icon: Clock, count: stats.active },
    {
      key: "completed",
      label: "Completed",
      icon: CheckCircle,
      count: stats.completed,
    },
  ];

  return (
    <div className="inline-flex bg-gray-200 rounded-lg p-1 gap-1">
      {filters.map(({ key, label, icon: Icon, count }) => (
        <button
          key={key}
          type="button"
          onClick={() => onFilterChange(key)}
          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${
            filter === key ? "bg-white shadow" : ""
          }`}
        >
          <Icon size={14} />
          <span>{label}</span>
          <span>{count}</span>
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
