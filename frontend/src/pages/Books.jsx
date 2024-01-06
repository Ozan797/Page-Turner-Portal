import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <h1>Page Turner Portal</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover} alt="Cover of book" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <div className="card">
              <span>${book.price}</span>
              <div className="buttons">
                <button
                  className="delete"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
                <button className="update">
                  <Link to={`/update/${book.id}`}>Update</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </section>
  );
};
export default Books;
