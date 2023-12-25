import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function Update() {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split('/')[2]

  function handleUpdate(e) {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value })); // 再回来看下 name一直搞不清楚
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3001/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      throw err;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={handleUpdate}
        name="title"
      />
      <input
        type="text"
        placeholder="Description"
        onChange={handleUpdate}
        name="description"
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleUpdate}
        name="price"
      />
      <input
        type="text"
        placeholder="Cover"
        onChange={handleUpdate}
        name="cover"
      />
      <button>Update</button>
    </form>
  );
}

export default Update;
