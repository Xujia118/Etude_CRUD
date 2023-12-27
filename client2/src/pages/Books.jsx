import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Books() {
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBookList() {
      try {
        const res = await axios.get("http://localhost:3001/books");
        setBookList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBookList();
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
      <h1>My Bookshop</h1>
      <ul className="menu">
        {bookList.map((book) => (
          <li className="menu-item" key={book.id}>
            <div className="menu-cover">{book.cover}</div>
            <p>{book.title}</p>
            <p>{book.description}</p>
            <p>${book.price}</p>
            <button
              onClick={() => {
                navigate(`update/${book.id}`, { state: { book } });
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Books;
