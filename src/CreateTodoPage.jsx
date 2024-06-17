import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import { Alert, Snackbar } from "@mui/material";

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

function CreateTodoPage() {
  const [open, setOpen] = useState(false);
  const [succesAlertText, setsuccesAlertText] = useState("");
  const [severity, setseverity] = useState("");

  async function addTodo(title, personName, description) {
    const newTodo = {
      id: makeId(10),
      title,
      isComplete: false,
      labels: personName,
      description,
    };

    try {
      await axios.post(URL, newTodo);

      setseverity("success");
      setsuccesAlertText("Todo Added Successfully!");
      setOpen(true);
    } catch (err) {
      setseverity("error");
      setsuccesAlertText("There was an error adding the todo");
      setOpen(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
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
      <div className="container-2">
        <div className="detail-container">
          <AddTodoForm addTodo={addTodo} />
        </div>
      </div>
    </>
  );
}

export default CreateTodoPage;
