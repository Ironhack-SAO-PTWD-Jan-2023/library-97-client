import { useState } from 'react';
import api from '../api/library.api';

function AddBook({ updateBookList }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleAuthor = (e) => setAuthor(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleRating = (e) => setRating(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = {
      title, author, description, rating
    }
    await api.addBook(book);
    resetForm();
    updateBookList();
  }

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setDescription('');
    setRating(0);
  }

  return (
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
  )
}

export default AddBook;
