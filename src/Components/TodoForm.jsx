import { Check, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addTodo, setIsAddingTodo } from "../Store/TodoSlice";
import { useState, useRef } from "react";

const TodoForm = ({
  onSubmit,
  onCancel,
  initialValue = "",
  placeholder = "Add a new todo",
}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(initialValue);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) return;

    if (onSubmit) {
      onSubmit(trimmedText);
    } else {
      dispatch(addTodo(trimmedText));
      dispatch(setIsAddingTodo(false));
    }

    setText("");
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      dispatch(setIsAddingTodo(false));
    }
    setText("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCancel();
    }
  };
  return (
    <form className="bg-white border rounded-xl p-3" onSubmit={handleSubmit}>
      <div className="flex gap-3">
        <input
          ref={inputRef}
          value={text}
          onKeyDown={handleKeyDown}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          type="text"
          maxLength={500}
          className="flex-1 px-3 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded-lg"
        >
          <Check size={18} />
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="p-2 bg-slate-200 rounded-lg"
        >
          <X size={18} />
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
