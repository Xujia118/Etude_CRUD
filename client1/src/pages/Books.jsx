import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete("http://localhost:3001/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Bookshop</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <span>{book.price}</span>
            <button>
              <Link to={`update/${book.id}`}>Update</Link>
            </button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button>
        <Link to="/add"> Add new book </Link>
      </button>
    </>
  );
}

export default Books;
