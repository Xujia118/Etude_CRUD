import React, { useState } from "react";

import "./App.css";
import TaskList from "./TaskList";

function App() {
  const [taskList, setTaskList] = useState([]);

  return (
    <>
      <TaskList 
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </>
  );
}

export default App;
