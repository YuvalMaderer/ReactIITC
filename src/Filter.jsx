import TextField from "@mui/material/TextField";

function Filter({ searchTerm, onChange, handleChange }) {
  return (
    <div className="search">
      <p className="search-p">Search Items:</p>
      <TextField
        id="outlined-basic"
        label="Search in todos..."
        variant="outlined"
        value={searchTerm}
        onChange={onChange}
      />
    </div>
  );
}

export default Filter;
