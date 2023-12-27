const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createConnection({
  user: "root",
  password: "password",
  database: "test",
});

app = express();

app.use(express.json());
app.use(cors());

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
 
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book was created.");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) throw err;
    res.json("Book was deleted.");
  });
});
 
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) throw err;
    res.json("Book was updated.");
  });
});

app.listen(3001, (req, res) => {
  console.log("Server running on port 3001");
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected to databse.");
  });
});
