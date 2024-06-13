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

export default Filter;
