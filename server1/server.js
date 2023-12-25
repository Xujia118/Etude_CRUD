const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

// Connect to database
const db = mysql.createConnection({
  user: "root",
  password: "password",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/books", (req, res) => {
  const querySelect = "SELECT * FROM books";
  db.query(querySelect, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/books", (req, res) => {
  const queryInsert =
    "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)";
  console.log(req.body);
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(queryInsert, [values], (err, result) => {
    if (err) throw err;
    res.json("Book was created.");
  });
});

// to delete a book, you need to know the id
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const queryDelete = "DELETE FROM books WHERE id = ?";

  db.query(queryDelete, [bookId], (err, result) => {
    if (err) throw err;
    res.json("Book was deleted.");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const queryUpdate =
    "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(queryUpdate, [...values, bookId], (err, result) => {
    if (err) throw err;
    res.json("Book was updated.");
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001"); // Server is running
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database!");
  });
});
