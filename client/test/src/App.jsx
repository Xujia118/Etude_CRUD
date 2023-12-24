import React, { useEffect, useState } from "react";
import Axios from "axios";

import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setMovieList(response.data);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([
      ...movieList,
      {
        movieName: movieName,
        movieReview: review,
      },
    ]);
    setMovieName("");
    setReview("");
  }

  function handleDelete(movie) {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }

  function handleUpdateReview(movie) {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>CRUD Application</h1>
        <label htmlFor="name">Movie name: </label>
        <input
          type="text"
          id="name"
          value={movieName}
          onChange={(event) => setMovieName(event.target.value)}
        />

        <label htmlFor="review">Review: </label>
        <input
          type="text"
          id="review"
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />

        <button>Submit</button>
      </form>

      <ul>
        {movieList.map((item) => (
          <li key={item.id}>
            {item.movieName} | {item.movieReview}
            <button onClick={() => handleUpdateReview(item.movieName)}>
              Edit
            </button>
            <input
              type="text"
              onChange={(event) => setNewReview(event.target.value)}
            />
            <button onClick={() => handleDelete(item.movieName)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
