import PropTypes from "prop-types";

function TodoItem({ todo, updateTodo, removeTodo }) {
  return (
    <li className="todo-card">
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.isComplete}
        onChange={() => updateTodo(todo.id)}
      />
      <label
        className={`${todo.isComplete ? "checked" : ""} input-label`}
        htmlFor={todo.id}
      >
        {todo.title}
      </label>
      <button onClick={() => removeTodo(todo.id)} className="remove">
        remove todo
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
