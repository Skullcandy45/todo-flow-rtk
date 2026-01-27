import { createSlice } from "@reduxjs/toolkit";

const loadTodosFromLocalStorage = () => {
  try {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch {
    return [];
  }
};

const saveTodosToLocalStorage = (todos) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Could not save todos to localStorage", error);
  }
};

const initialState = {
  items: loadTodosFromLocalStorage(),
  filter: "all",
  isAddingTodo: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setIsAddingTodo: (state, action) => {
      state.isAddingTodo = action.payload;
    },

    addTodo: (state, action) => {
      const text = action.payload?.trim();
      if (!text) return;

      const newTodo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      state.items.unshift(newTodo);
      state.isAddingTodo = false;
      saveTodosToLocalStorage(state.items);
    },

    toggleTodo: (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date().toISOString();
        saveTodosToLocalStorage(state.items);
      }
    },

    deleteTodo: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      saveTodosToLocalStorage(state.items);
    },

    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find((t) => t.id === id);

      if (todo && text?.trim()) {
        todo.text = text.trim();
        todo.updatedAt = new Date().toISOString();
        saveTodosToLocalStorage(state.items);
      }
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    markAllComplete: (state) => {
      state.items.forEach((todo) => {
        if (!todo.completed) {
          todo.completed = true;
          todo.updatedAt = new Date().toISOString();
        }
      });
      saveTodosToLocalStorage(state.items);
    },

    clearCompleted: (state) => {
      state.items = state.items.filter((todo) => !todo.completed);
      saveTodosToLocalStorage(state.items);
    },
  },
});

export const {
  setIsAddingTodo,
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  markAllComplete,
  clearCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;
