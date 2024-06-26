import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  "School",
  "Work",
  "Home",
  "Business",
  "Personal Life",
  "Sport",
  "Education",
  "Friends",
  "Kids",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddTodoForm(props) {
  const inputRef = useRef(null);
  const inputDescriptionRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    const inputDescriptionValue = inputDescriptionRef.current.value;
    props.addTodo(inputValue, personName, inputDescriptionValue);
    setPersonName([]);
    inputRef.current.value = "";
    inputDescriptionRef.current.value = "";
    inputRef.current.focus();
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Enter title here..."
        variant="outlined"
        inputRef={inputRef}
        sx={{
          width: "100%",
          maxWidth: "300px",
          marginBottom: "10px",
          marginRight: "10px",
        }}
        required
      />
      <FormControl
        sx={{
          width: "100%",
          maxWidth: "300px",
          marginBottom: "10px",
          marginRight: "10px",
        }}
      >
        <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
        <Select
          required
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Categories" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id="outlined-basic"
          label="Enter description here..."
          variant="outlined"
          inputRef={inputDescriptionRef}
          sx={{
            marginTop: "10px",
            width: "100%",
            maxWidth: "300px",
            marginBottom: "10px",
            marginRight: "10px",
          }}
          required
        />
      </FormControl>
      <Tooltip title="Add Todo">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ height: ITEM_HEIGHT, width: "300px" }}
        >
          Add Todo
        </Button>
      </Tooltip>
    </form>
  );
}

export default AddTodoForm;
