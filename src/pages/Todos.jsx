import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSort } from '@fortawesome/free-solid-svg-icons';
import "../css/Todos.css";

const Todos = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [sorting, setSorting] = useState("sequential");
  const [searchTerm, setSearchTerm] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [user]);

  const fetchTodos = () => {
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter(t => t.userId === parseInt(user.id, 10));
        setTodos(data);
        localStorage.setItem("todos", JSON.stringify(data));
      });
  };

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodoTitle.trim() === "") return;
    const newTodo = {
      userId: parseInt(user.id, 10),
      id: todos.length ? Math.max(todos.map(todo => parseInt(todo.id, 10))) + 1 : 1,
      title: newTodoTitle,
      completed: false
    };

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
    .then(response => response.json())
    .then(data => {
      const updatedTodos = [...todos, data];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setNewTodoTitle("");
    })
    .catch(error => {
      console.error("Error adding todo:", error);
    });
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    })
    .catch(error => {
      console.error("Error deleting todo:", error);
    });
  };

  const handleToggleComplete = (todo_id) => {
    const todoToUpdate = todos.find(todo => todo.id === todo_id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    fetch(`http://localhost:3000/todos/${todo_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
    .then(response => response.json())
    .then(data => {
      const updatedTodos = todos.map(todo =>
        todo.id === todo_id ? data : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    })
    .catch(error => {
      console.error("Error updating todo:", error);
    });
  };

  const handleUpdateTodo = (id, newTitle) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    const updatedTodo = { ...todoToUpdate, title: newTitle };

    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
    .then(response => response.json())
    .then(data => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? data : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    })
    .catch(error => {
      console.error("Error updating todo:", error);
    });
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (searchTerm === "") return true;
      if (todo.id.toString().includes(searchTerm) || 
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (todo.completed ? "completed" : "pending").includes(searchTerm.toLowerCase())) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      switch (sorting) {
        case "sequential":
          return a.id - b.id;
        case "completed":
          return b.completed - a.completed;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "random":
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

  return (
    <div className="todos-container">
      <h1 className="todos-title">My Tasks</h1>
      <div className="sorting-container">
        <FontAwesomeIcon icon={faSort} className="sorting-icon" />
        <select id="sorting" value={sorting} onChange={handleSortingChange}>
          <option value="sequential">Sequential</option>
          <option value="completed">Completed</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
        <input
          type="text"
          placeholder="Search Tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <hr />
      <div className="add-todo-container">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a new task"
          className="new-todo-input"
        />
        <button onClick={handleAddTodo} className="add-todo-button">Add Task</button>
      </div>
      <div className="todos-list">
        {filteredTodos.map((todo, index) => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              onChange={() => handleToggleComplete(todo.id)}
              style={{ accentColor: "#5d73e2" }}
              checked={todo.completed}
            />
            {todo.completed ? (
              <span>
                <s>{index + 1}. {todo.title}</s>
              </span>
            ) : (
              <span>{index + 1}. {todo.title}</span>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button onClick={() => {
              const newTitle = prompt("Enter new title:", todo.title);
              if (newTitle) {
                handleUpdateTodo(todo.id, newTitle);
              }
            }} className="edit-button">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
