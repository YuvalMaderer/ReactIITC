import { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import TodoStatistics from "./TodoStatistics";
import Filter from "./Filter";

const URL = "http://localhost:8001/data";

function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    console.log("Welcome to the best todo app!");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const result = await response.json();
        setTodos(result);
        setFilteredTodos(result);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredTodos(
      todos.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [todos, searchTerm]);

  function removeTodo(todoId) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  }

  function addTodo(title) {
    const newTodo = {
      id: makeId(10),
      title,
      isComplete: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  }

  function updateTodo(todoId) {
    const newTodos = todos.map((todo) => {
      if (todoId === todo.id) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });

    setTodos(newTodos);
  }

  function onChange(e) {
    setSearchTerm(e.target.value);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const totalNumberOfTodos = todos.length;
  const completedTodos = todos.filter(
    (todo) => todo.isComplete === true
  ).length;
  const activeTodos = todos.filter((todo) => todo.isComplete === false).length;

  return (
    <>
      <main className="container">
        <div className="left">
          <h1>TODOS!</h1>
          <AddTodoForm addTodo={addTodo} />
          <Filter searchTerm={searchTerm} onChange={onChange} />
          <TodoList
            todos={filteredTodos}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
          />
        </div>

        <div className="right">
          <TodoStatistics
            total={totalNumberOfTodos}
            completed={completedTodos}
            active={activeTodos}
          />
        </div>
      </main>
    </>
  );
}

export default App;
