import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./AppBar";
import TodoPage from "./TodoPage";
import HomePage from "./HomePage";
import CreateTodoPage from "./CreateTodoPage";
import NotFoundPage from "./NotFoundPage";
import TodoDetailsPage from "./TodoDetailsPage";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Todo">
          <Route index element={<TodoPage />} />
          <Route path=":todoId" element={<TodoDetailsPage />} />
          <Route path="Add-Todo" element={<CreateTodoPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
