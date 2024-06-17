import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";

function TodoItem({ todo, updateTodo, removeTodo }) {
  return (
    <li className="todo-card">
      <Checkbox
        defaultChecked={todo.isComplete}
        onChange={() => updateTodo(todo)}
        id={todo.id}
      ></Checkbox>
      <Tooltip title={todo.title}>
        <label
          className={`${todo.isComplete ? "checked" : ""} input-label`}
          htmlFor={todo.id}
        >
          {todo.title.slice(0, 40) + (todo.title.length > 40 ? "..." : "")}
        </label>
      </Tooltip>
      <Tooltip title="Delete">
        <Button
          variant="contained"
          color="error"
          onClick={() => removeTodo(todo.id)}
        >
          Remove Todo
        </Button>
      </Tooltip>
    </li>
  );
}

export default TodoItem;
