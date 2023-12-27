import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import "./Add.css";

function Add() {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  function handleAdd(event) {
    setBook((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="book-name">Name: </label>
        <input type="text" id="book-name" name="title" onChange={handleAdd} />

        <label htmlFor="book-description">Description: </label>
        <input
          type="text"
          id="book-description"
          name="description"
          onChange={handleAdd}
        />

        <label htmlFor="book-price">Price: </label>
        <input type="number" id="price" name="price" onChange={handleAdd} />

        <label htmlFor="book-cover">Cover: </label>
        <input type="text" id="book-cover" name="cover" onChange={handleAdd} />

        <button>Add</button>
      </form>
    </div>
  );
}

export default Add;
