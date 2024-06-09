import { useState } from "react";

const data = [
  { id: "1", title: "Learn React", isComplete: false },
  { id: "2", title: "Build a Todo App", isComplete: false },
  { id: "3", title: "Read JavaScript Documentation", isComplete: true },
  { id: "4", title: "Write Unit Tests", isComplete: false },
  { id: "5", title: "Implement Context", isComplete: true },
  { id: "6", title: "Create Portfolio Website", isComplete: false },
  { id: "7", title: "Learn TypeScript", isComplete: false },
  { id: "8", title: "Refactor Codebase", isComplete: true },
  { id: "9", title: "Optimize Performance", isComplete: false },
  { id: "10", title: "Deploy to Production", isComplete: true },
];

function App() {
  const [todos, setTodos] = useState(data);
  const [inputValue, setInputValue] = useState("");

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

  function removeTodo(todoId) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function addTodo(e) {
    e.preventDefault();
    const newTodo = {
      id: makeId,
      title: inputValue,
      isComplete: false,
    };

    const newsTodos = [...todos, newTodo];
    setTodos(newsTodos);
    setInputValue("");
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

  const totalNumberOfTodos = todos.length;
  const completedTodos = todos.filter(
    (todo) => todo.isComplete === true
  ).length;
  const activeTodos = todos.filter((todo) => todo.isComplete === false).length;

  return (
    <>
      <h1>TODOS!</h1>
      <p>add todo:</p>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="enter title here..."
        />
        <button type="submit">add todo</button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                value={todo.id}
                type="checkbox"
                id={todo.id}
                checked={todo.isComplete}
                onChange={() => updateTodo(todo.id)}
              />
              <label
                className={todo.isComplete ? "checked" : ""}
                htmlFor={todo.id}
              >
                {todo.title}
              </label>
              <button onClick={() => removeTodo(todo.id)} className="remove">
                remove todo
              </button>
            </li>
          );
        })}
      </ul>

      <p>total todos: {totalNumberOfTodos}</p>
      <p>total completed todos: {completedTodos}</p>
      <p>total not completed todos: {activeTodos}</p>
      <progress
        id="file"
        value={completedTodos}
        max={totalNumberOfTodos}
      ></progress>
      <br />
      <br />
    </>
  );
}

export default App;
