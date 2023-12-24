const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db = require("./database");

// app.get("/", (req, res) => {
//     //     const myquery = "SELECT * FROM movie_reviews";
//   const sqlInsert =
//     "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('Indiana Jones', 'Exciting!')";
//     db.query(sqlInsert, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//   });
// });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
    // res.send(result);
  });
});

app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;

  const sqlUpdate =
    "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
  db.query(sqlUpdate, [name, review], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
  db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
  });
});
