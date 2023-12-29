const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createConnection({
  user: "root",
  password: "password",
  database: "todos_app",
});

app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const q = "SELECT * FROM tasks";
  db.query(q, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

app.post("/", (req, res) => {
  const q = "INSERT INTO tasks (`title`, `content`) VALUES (?)";
  const values = [req.body.title, req.body.content];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "DELETE FROM tasks WHERE id = ?";

  db.query(q, [taskId], (err, data) => {
    if (err) throw err;
    res.json("Task was delete.");
  });
});

app.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "UPDATE tasks SET `title` = ?, `content` = ? WHERE id = ?";
  const values = [req.body.title, req.body.content];

  db.query(q, [...values, taskId], (err, data) => {
    if (err) throw err;
    res.json("Task was updated.")
  })
})

app.listen(3001, (req, res) => {
  console.log("Server running on port 3001");
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database.");
  });
});
