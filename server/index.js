const express = require("express");
const app = express();

const db = require("./database");

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('Indiana Jones', 'Exciting!')";
  
    db.query(sqlInsert, (err, result) => {
        if (err) throw err;
        res.send(result);
  });
});

// app.get("/", (req, res) => {
//     const myquery = "SELECT * FROM movie_reviews";
//     db.query(myquery, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

app.listen(3001, () => {
  console.log("Running on port 3001");
  db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
  });
});
