import { Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookDetailsPage from './pages/BookDetailsPage';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/books' element={<BookListPage />} />
        <Route path='/books/:bookId' element={<BookDetailsPage />} />

        <Route path="*" element={<div>404 - Page not found!</div>} />
      </Routes>
    </div>
  );
}

export default App;
