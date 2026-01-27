import { Calendar, Check, Edit3, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleTodo, updateTodo, deleteTodo } from "../Store/TodoSlice";
import { useState } from "react";
import TodoForm from "./TodoForm";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleUpdate = (text) => {
    dispatch(updateTodo({ id: todo.id, text: text.trim() }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-gray-100 rounded-xl">
        <TodoForm
          initialValue={todo.text}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          placeholder="Edit todo..."
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          className="w-6 h-6 flex items-center justify-center rounded-full border"
          onClick={handleToggle}
        >
          {todo.completed && <Check size={14} />}
        </button>

        <div className="flex-1 space-y-2">
          <p className="font-medium">{todo.text}</p>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{formatDate(todo.createdAt)}</span>
            </div>
            <span>updated {formatDate(todo.updatedAt)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="p-1"
          >
            <Edit3 size={16} />
          </button>
          <button type="button" onClick={handleDelete} className="p-1">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
