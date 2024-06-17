import TodoItem from "./TodoItem";
import Skeleton from "@mui/material/Skeleton";

function TodoList({ todos, updateTodo, removeTodo, loading }) {
  if (loading) {
    return (
      <>
        <br />
        <Skeleton variant="rounded" width="100%" height={70} />
        <br />
        <Skeleton variant="rounded" width="100%" height={70} />
        <br />
        <Skeleton variant="rounded" width="100%" height={70} />
        <br />
        <Skeleton variant="rounded" width="100%" height={70} />
        <br />
        <Skeleton variant="rounded" width="100%" height={70} />
        <br />
        <Skeleton variant="rounded" width="100%" height={70} />
        <br />
      </>
    );
  }

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
