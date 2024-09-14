import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const { data } = await axios.get("http://localhost:8000/todos");
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (newTodo) => {
    const { data } = await axios.post("http://localhost:8000/todos", newTodo);
    setTodos([...todos, data]);
  };

  const removeTodo = async (id) => {
    await axios.delete(`http://localhost:8000/todos/${id}`);
    setTodos(() => {
      return todos.filter((el) => el.id !== id);
    });
  };

  const editTodo = (todo, id) => {
    setTodos(() => {
      return todos.map((el) => (el.id === id ? todo : el));
    });
  };

  return (
    <div className="App">
      <AddTodo addTodo={addTodo} />
      <br /> <br />
      <h2>TODO LIST</h2>
      <TodoList>
        {todos.map((el) => {
          return (
            <TodoItem
              eachTodo={el}
              key={el.id}
              removeTodo={removeTodo}
              editTodo={editTodo}
            />
          );
        })}
      </TodoList>
    </div>
  );
}

export default App;
