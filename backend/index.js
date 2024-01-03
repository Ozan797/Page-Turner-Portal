import express from "express";
import mysql from "mysql2";

const app = express();
const port = 8800;
const serverUrl = `http://localhost:${port}`;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "bookshelf",
});
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at ${serverUrl}`);
});
