import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Books from "./pages/Books";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
