import { CheckCircle2, Circle, Plus, Trash } from "lucide-react";
import TodoFilter from "./TodoFilter";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import {
  markAllComplete,
  clearCompleted,
  setFilter,
  setIsAddingTodo,
} from "../Store/TodoSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  selectFilteredTodos,
  selectTodosStats,
  selectIsAddingTodo,
} from "../Store/Selector";

const TodoApp = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);
  const stats = useSelector(selectTodosStats);
  const filteredTodos = useSelector(selectFilteredTodos);
  const isAddingTodo = useSelector(selectIsAddingTodo);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleMarkComplete = () => {
    dispatch(markAllComplete());
  };

  const handleClearComplete = () => {
    dispatch(clearCompleted());
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
        {/* header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Todo Flow</h1>
          <p className="text-slate-500">organize your life</p>
        </div>

        {/* stats */}
        {stats.total > 0 && (
          <div className="bg-slate-50 rounded-xl p-4 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-600">
                progress overview
              </h2>
              <div className="h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${stats.completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 text-center gap-4">
              <div>
                <div className="text-xl font-bold">{stats.total}</div>
                <div className="text-xs text-slate-500">total</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600">
                  {stats.active}
                </div>
                <div className="text-xs text-slate-500">active</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">
                  {stats.completed}
                </div>
                <div className="text-xs text-slate-500">complete</div>
              </div>
            </div>
          </div>
        )}

        {/* actions */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => dispatch(setIsAddingTodo(true))}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                <Plus size={18} /> add todo
              </button>

              {stats.completed > 0 && (
                <button
                  type="button"
                  onClick={handleClearComplete}
                  className="flex items-center gap-2 px-3 py-2 text-red-500"
                >
                  <Trash size={16} /> clear
                </button>
              )}

              {stats.active > 0 && (
                <button
                  type="button"
                  onClick={handleMarkComplete}
                  className="flex items-center gap-2 px-3 py-2 text-green-600"
                >
                  <CheckCircle2 size={16} /> complete all
                </button>
              )}
            </div>

            <TodoFilter
              filter={filter}
              stats={stats}
              onFilterChange={handleFilterChange}
            />
          </div>

          {isAddingTodo && <TodoForm placeholder="what needs to be done?" />}

          {filteredTodos.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-slate-400">
              <Circle size={48} />
              <p className="mt-2 font-medium">no {filter} todos</p>
              <p className="text-sm">
                {filter === "completed" && "all todos are completed"}
                {filter === "active" && "no active todos"}
                {filter === "all" && "add your first todo"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </div>

        <div className="text-center text-xs text-slate-400">footer</div>
      </div>
    </div>
  );
};

export default TodoApp;
