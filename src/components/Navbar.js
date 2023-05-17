import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <nav>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>

      {isLoggedIn ? (
        <>
          <NavLink to="/books">
            <button>Books</button>
          </NavLink>
          <NavLink to="/profile">
            <button>Profile</button>
          </NavLink>
          <button onClick={logoutUser}>Logout</button>
          <span>{user && user.username}</span>
        </>
      ) : (
        <>
          <NavLink to="/signup">
            <button>Signup</button>
          </NavLink>
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        </>
      )}

    </nav>
  )
}

export default Navbar;