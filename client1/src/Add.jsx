import React, { useState, useEffect } from "react";
import axios from "axios";

function Add({ taskList, setTaskList }) {
  // Initialize state
  const [task, setTask] = useState({
    title: "",
    content: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // Update taskList right here. We don't need reponse from the server.
    setTaskList([...taskList, task]);

    try {
      // First send out task data
      await axios.post("http://localhost:3001", task);

      // Then reset task
      setTask({
        title: "",
        content: "",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Add Task: </label>
      <input
        type="text"
        id="task"
        name="task"
        value={task.title}
        placeholder="Add Task"
        onChange={(e) => setTask({ ...task, title: e.target.value })} // Don't forget task is an object
      />

      <label htmlFor="task">Add Note: </label>
      <input
        type="text"
        id="task"
        name="task"
        value={task.content}
        placeholder="Add Task"
        onChange={(e) => setTask({ ...task, content: e.target.value })}
      />

      <button>Add</button>
    </form>
  );
}

export default Add;
