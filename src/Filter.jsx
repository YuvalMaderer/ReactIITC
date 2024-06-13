import PropTypes from "prop-types";

function Filter({ searchTerm, onChange }) {
  return (
    <div className="search">
      <p>Search Items:</p>
      <input
        placeholder="search in todos..."
        type="search"
        value={searchTerm}
        onChange={onChange}
      />
    </div>
  );
}

Filter.propTypes = {
  searchTerm: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
