import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Add() {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  function handleAdd(e) {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value })); // 再回来看下 name一直搞不清楚
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/books", book);
      navigate("/");
    } catch (err) {
      throw err;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={handleAdd}
        name="title"
      />
      <input
        type="text"
        placeholder="Description"
        onChange={handleAdd}
        name="description"
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleAdd}
        name="price"
      />
      <input
        type="text"
        placeholder="Cover"
        onChange={handleAdd}
        name="cover"
      />
      <button>Add</button>
    </form>
  );
}

export default Add;
