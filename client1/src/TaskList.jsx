import React, { useState, useEffect } from "react";
import axios from "axios";
import Add from "./Add";
import EditTask from "./EditTask";

function TaskList({ taskList, setTaskList }) {
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Get books
  useEffect(() => {
    async function fetchBookList() {
      try {
        const res = await axios.get("http://localhost:3001");
        setTaskList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBookList();
  }, []);

  // Delete books
  async function handleDelete(taskId) {
    try {
      setTaskList(taskList.filter((task) => task.id != taskId));
      await axios.delete("http://localhost:3001/" + taskId);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <ul>
        <h2>Todos</h2>
        <Add taskList={taskList} setTaskList={setTaskList} />
        {taskList.length === 0 && "No Task"}
        {taskList.map((task) =>
          editingTaskId === task.id ? (
            <EditTask 
                key={task.id}
                taskList={taskList}
                setTaskList={setTaskList}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
                taskTitle={task.title}
                taskContent={task.content}
            />
          ) : (
            <li key={task.id}>
              <p>{task.title}</p>
              <p>{task.content}</p>
              <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default TaskList;
