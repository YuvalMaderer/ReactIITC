import PropTypes from "prop-types";

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

TodoStatistics.propTypes = {
  total: PropTypes.func.isRequired,
  completed: PropTypes.func.isRequired,
  active: PropTypes.func.isRequired,
};

export default TodoStatistics;
