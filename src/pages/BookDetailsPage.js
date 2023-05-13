import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/library.api';

function BookDetailsPage() {
  const [book, setBook] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleAuthor = (e) => setAuthor(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleRating = (e) => setRating(e.target.value);

  const { bookId } = useParams();
  const navigate = useNavigate();

  const fetchBook = useCallback(async () => {
    const bookFromDB = await api.getBook(bookId);
    setBook(bookFromDB);
    setTitle(bookFromDB.title);
    setAuthor(bookFromDB.author);
    setDescription(bookFromDB.description);
    setRating(bookFromDB.rating);
  }, [bookId])

  const deleteBook = async () => {
    await api.removeBook(bookId);
    navigate('/books');
  }

  const toggleIsFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.editBook(bookId, {title, description, rating, author});
    setIsFormOpen(false);
    fetchBook();
  }

  useEffect(() => {
    fetchBook();
  }, [fetchBook])

  return (
    <div className="BookDetails">
      {book && (
        <>
          {isFormOpen ? (
            <div className="AddBook">
              <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input id="title" type="text" value={title} onChange={handleTitle} />
                
                <label htmlFor="author">Author:</label>
                <input id="author" type="text" value={author} onChange={handleAuthor} />
                
                <label htmlFor="description">Description:</label>
                <textarea id="description" type='text' value={description} onChange={handleDescription} />
                
                <label htmlFor="rating">Rating:</label>
                <input id="rating" type="text" value={rating} onChange={handleRating} />

                <button type="submit">Submit</button>
              </form>
            </div>
          ) : (
            <>
              <h1>{book.title}</h1>
              <span>{book.rating}</span>
              <p>Autor: {book.author}</p>
              <p>{book.description}</p>
            </>
          )}
        </>
      )}

      <button onClick={toggleIsFormOpen}>{isFormOpen ? 'Cancelar' : 'Editar'}</button>
      <Link to='/books'>
        <button>Voltar</button>
      </Link>
      <button onClick={deleteBook}>Remover</button>
    </div>
  )
}

export default BookDetailsPage;