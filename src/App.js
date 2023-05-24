import { Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        
        <Route path='/books' element={<IsPrivate><BookListPage /></IsPrivate>} />
        <Route path='/books/:bookId' element={<IsPrivate><BookDetailsPage /></IsPrivate>} />
        <Route path='/profile' element={<IsPrivate><ProfilePage /></IsPrivate>} />

        <Route path='/signup' element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />

        <Route path="*" element={<div>404 - Page not found!</div>} />
      </Routes>
    </div>
  );
}

export default App;
