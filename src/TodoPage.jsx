import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Filter from "./Filter";
import TodoList from "./TodoList";
import TodoStatistics from "./TodoStatistics";
import { Link } from "react-router-dom";

const URL = "http://localhost:8001/data/";

// function makeId(length) {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [succesAlertText, setsuccesAlertText] = useState("");
  const [severity, setseverity] = useState("");

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function removeTodo(todoId) {
    await axios.delete(URL + todoId);
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
    setseverity("success");
    setsuccesAlertText("Todo Removed Successfully!");
    setOpen(true);
  }

  //   async function addTodo(title, personName) {
  //     const newTodo = {
  //       id: makeId(10),
  //       title,
  //       isComplete: false,
  //       labels: personName,
  //     };

  //     try {
  //       await axios.post(URL, newTodo);

  //       setTodos((prevTodos) => {
  //         return [...prevTodos, newTodo];
  //       });

  //       setseverity("success");
  //       setsuccesAlertText("Todo Added Successfully!");
  //       setOpen(true);
  //     } catch (err) {
  //       setseverity("error");
  //       setsuccesAlertText("There was an error adding the todo");
  //       setOpen(true);
  //     }
  //   }

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
      setseverity("success");
      setsuccesAlertText("Todo Updated Successfully!");
      setOpen(true);
    } catch (err) {
      setseverity("error");
      setsuccesAlertText("There was an error updating this todo");
      setOpen(true);
    }
  }

  function onChange(e) {
    setSearchTerm(e.target.value);
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
      <div className="container-2">
        <main className="container">
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {succesAlertText}
            </Alert>
          </Snackbar>
          <div className="left">
            <div className="flex">
              <img
                src="../images/OIG4.GT2WdI6vt.jpg"
                alt="image"
                width={"80px"}
              />
              <h1>TODOS!</h1>
            </div>
            <Button variant="contained" component={Link} to="/Add-Todo">
              Create Todo!
            </Button>
            <br />
            <br />
            <Filter searchTerm={searchTerm} onChange={onChange} />
            <TodoList
              todos={filteredTodos}
              updateTodo={updateTodo}
              removeTodo={removeTodo}
              loading={loading}
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
      </div>
    </>
  );
}

export default TodoPage;
