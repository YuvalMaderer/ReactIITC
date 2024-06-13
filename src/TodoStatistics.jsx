function TodoStatistics({ total, completed, active }) {
  return (
    <div>
      <h2>Statistics:</h2>
      <p>Total Todos: {total}</p>
      <p>Completed Todos: {completed}</p>
      <p>Active Todos: {active}</p>
      <progress id="file" value={completed} max={total}></progress>
    </div>
  );
}

export default TodoStatistics;
