import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Update() {
  const location = useLocation();
  const book = location.state.book; // So many layers!!!

  const navigate = useNavigate();
  const bookId = location.pathname.split("/")[2];

  const [updateBook, setUpdateBook] = useState({
    title: book.title,
    description: book.description,
    price: book.price,
    cover: book.cover,
  });

  function handleUpdate(e) {
    setUpdateBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3001/books/" + bookId, updateBook);
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
        value={updateBook.title}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={handleUpdate}
        name="description"
        value={updateBook.description}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleUpdate}
        name="price"
        value={updateBook.price}
      />
      <input
        type="text"
        placeholder="Cover"
        onChange={handleUpdate}
        name="cover"
        value={updateBook.cover}
      />
      <button>Update</button>
    </form>
  );
}

export default Update;
