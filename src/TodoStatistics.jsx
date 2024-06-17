import LinearProgress from "@mui/material/LinearProgress";
import { height } from "@mui/system";

function TodoStatistics({ total, completed, active }) {
  // Calculate the percentage of completed todos
  const completionPercentage = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div>
      <h2>Statistics:</h2>
      <p>Total Todos: {total}</p>
      <p>Completed Todos: {completed}</p>
      <p>Active Todos: {active}</p>
      <LinearProgress
        variant="determinate"
        value={completionPercentage}
        sx={{ height: "16px", borderRadius: "4px" }}
      />
    </div>
  );
}

export default TodoStatistics;
