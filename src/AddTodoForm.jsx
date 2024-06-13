import { useRef } from "react";
import PropTypes from "prop-types";

function AddTodoForm({ addTodo }) {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    addTodo(inputValue);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="enter title here..."
        required
        ref={inputRef}
      />
      <button className="button-29" type="submit">
        add todo
      </button>
    </form>
  );
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
