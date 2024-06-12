import TodoItem from "./TodoItem";

function TodoList({ todos, updateTodo, removeTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;