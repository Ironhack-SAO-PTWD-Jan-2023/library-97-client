import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/library.api';

import AddBook from '../components/AddBook';

function BookListPage() {
  const [books, setBooks] = useState(null);
  const [formIsOpen, setFormIsOpen] = useState(false);

  const fetchBooks = async () => {
    const booksFromDB = await api.getBooks();
    setBooks(booksFromDB);
  }

  const toggleFormOpen = () => {
    setFormIsOpen(!formIsOpen);
  }

  useEffect(() => {
    fetchBooks();
  }, [])

  return (
    <div className="BookListPage">

      <button onClick={toggleFormOpen}>
        {formIsOpen ? 'Close Form' : 'Open Form'}
      </button>
      {formIsOpen && <AddBook updateBookList={fetchBooks} /> }

      {books && books.map(book => {
        return (
          <div className='BookCard card' key={book._id}>
            <Link to={`/books/${book._id}`}>
              <h3>{book.title}</h3>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default BookListPage;