import React, { useState } from "react";
import axios from 'axios';

function EditTask({
  taskList,
  setTaskList,
  editingTaskId,
  setEditingTaskId,
  taskTitle,
  taskContent,
}) {
  const [editedTask, setEditedTask] = useState({
    title: taskTitle,
    content: taskContent,
  });

  function handleInput(e) {
    setEditedTask((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Update taskList
    const updatedList = taskList.map((task) =>
      task.id === editingTaskId
        ? { ...task, title: editedTask.title, content: editedTask.content }
        : task
    );

    setTaskList(updatedList);

    // Send data to database
    try {
      await axios.put("http://localhost:3001/" + editingTaskId, editedTask);
    } catch (err) {
      console.log(err);
    }

    // Reset editingTaskId
    setEditingTaskId(null);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleInput}
        />
        <input
          type="text"
          name="content"
          value={editedTask.content}
          onChange={handleInput}
        />

        <button>Update</button>
      </form>
    </>
  );
}

export default EditTask;
