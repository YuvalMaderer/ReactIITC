function TodoStatistics({ total, completed, active }) {
  return (
    <div>
      <p>total todos: {total}</p>
      <p>total completed todos: {completed}</p>
      <p>total not completed todos: {active}</p>
      <progress id="file" value={completed} max={total}></progress>
    </div>
  );
}

export default TodoStatistics;
