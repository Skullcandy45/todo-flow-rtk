# Todo Flow (Redux Toolkit)

A modern Todo application built with **React**, **Redux Toolkit**, and **Tailwind CSS**.  
It supports adding, editing, deleting, filtering todos and persists data using **localStorage**.

---

## ✨ Features

- Add, edit, delete todos
- Mark single / all todos as completed
- Filter todos (All / Active / Completed)
- Progress statistics with completion percentage
- Persistent storage using localStorage
- Clean, responsive UI with Tailwind CSS

---

## 🛠 Tech Stack

- React
- Redux Toolkit
- React Redux
- Tailwind CSS
- Lucide Icons

---

## 📂 Project Structure

src/
│
├── Components/
│ ├── TodoApp.jsx
│ ├── TodoForm.jsx
│ ├── TodoItem.jsx
│ └── TodoFilter.jsx
│
├── Store/
│ ├── Store.js
│ ├── TodoSlice.js
│ └── Selector.js
│
├── App.jsx
└── main.jsx

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install

2️⃣ Start development server
npm run dev
```

🧠 Redux State Shape
{
todos: {
items: [],
filter: "all",
isAddingTodo: false
}
}
👤 Author

Amey Gaikwad
