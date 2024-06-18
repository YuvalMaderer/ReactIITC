import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const URL = "http://localhost:8001/data/";

function TodoDetailsPage() {
  const { todoId } = useParams();
  const [todoDetails, setTodoDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");
  const newTitle = useRef("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL + todoId);
        const result = await response.json();
        setTodoDetails(result);
        setValue(result.title);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [todoId]);

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const editTitle = async () => {
    const newTitleValue = newTitle.current.value;
    try {
      await axios.patch(URL + todoId, { title: newTitleValue });
      setTodoDetails((prevDetails) => ({
        ...prevDetails,
        title: newTitleValue,
      }));
      setValue(newTitleValue);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-2">
      <div className="detail-container">
        <div className="top">
          {isEditing ? (
            <>
              <input
                type="text"
                value={value}
                onChange={handleChange}
                ref={newTitle}
                autoFocus
              />
              <Button onClick={editTitle}>
                <SaveIcon />
              </Button>
            </>
          ) : (
            <>
              <h1>{value}</h1>
              <Button onClick={handleToggleEdit}>
                <EditIcon />
              </Button>
            </>
          )}
        </div>
        <p>Labels: {todoDetails.labels?.join(", ")}</p>
        <p>Description: {todoDetails.description}</p>
      </div>
    </div>
  );
}

export default TodoDetailsPage;
