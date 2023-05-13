import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
      <NavLink to="/books">
        <button>Books</button>
      </NavLink>
    </nav>
  )
}

export default Navbar;