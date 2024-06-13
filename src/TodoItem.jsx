function TodoItem({ todo, updateTodo, removeTodo }) {
  return (
    <li className="todo-card">
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.isComplete}
        onChange={() => updateTodo(todo)}
      />
      <label
        className={`${todo.isComplete ? "checked" : ""} input-label`}
        htmlFor={todo.id}
      >
        {todo.title}
      </label>
      <button onClick={() => removeTodo(todo.id)} className="button-29 remove">
        remove todo
      </button>
    </li>
  );
}

export default TodoItem;
