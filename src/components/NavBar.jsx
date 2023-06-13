import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '../css/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';



function NavBar({ user }) {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.location.replace("/login");
        console.log('User signed out.');
      })
      .catch((error) => {
        // An error happened.
        console.error('Error signing out: ', error);
      });
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
      <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <FontAwesomeIcon icon={faApple} className="apple-logo" /> Razy's-Store
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/products" className="navbar-link">
            Products
          </Link>
        </li>
        {user && (
          <>
            <li className="navbar-item">
              <Link to="/products/add" className="navbar-link">
                Add Product
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/products/list" className="navbar-link">
                Product List
              </Link>
            </li>
          </>
        )}
        <li className="navbar-item">
          <Link to="/cart" className="navbar-link">
            Cart
          </Link>
        </li>
        {user ? (
          <li className="navbar-item">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
