import { useEffect, useMemo, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import TodoStatistics from "./TodoStatistics";
import Filter from "./Filter";

const URL = "http://localhost:8001/data/";

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

  useEffect(() => {
    console.log("Welcome to the best todo app!");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const result = await response.json();
        setTodos(result);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [todos, searchTerm]);

  async function removeTodo(todoId) {
    await axios.delete(URL + todoId);
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  }

  async function addTodo(title) {
    const newTodo = {
      id: makeId(10),
      title,
      isComplete: false,
    };

    try {
      await axios.post(URL, newTodo);

      setTodos((prevTodos) => {
        return [...prevTodos, newTodo];
      });
    } catch (err) {
      alert(err);
    }
  }

  async function updateTodo(todoToUpdate) {
    try {
      const { data: updateTodo } = await axios.patch(URL + todoToUpdate.id, {
        isComplete: !todoToUpdate.isComplete,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === todoToUpdate.id) {
            return updateTodo;
          }
          return todo;
        });
      });
    } catch (err) {
      alert(err);
    }
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
          <div className="flex">
            <img
              src="../images/OIG4.GT2WdI6vt.jpg"
              alt="image"
              width={"80px"}
            />
            <h1>TODOS!</h1>
          </div>
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
