import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ userName }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  // استخدام useEffect لتحديث العدد عند تحميل الصفحة أو عند التحديثات في السلة
  useEffect(() => {
    const count = JSON.parse(localStorage.getItem('cartCount')) || 0;
    setCartCount(count);
  }, [cartCount]); // سيتابع التغييرات في cartCount

  // وظيفة لتحديث العد التلقائي عندما يتم تعديل السلة
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length); // تحديث قيمة عدد المنتجات في السلة
  };

  useEffect(() => {
    // تحديث العدد عند تحميل الصفحة
    updateCartCount();
  }, []); // فقط عند تحميل الصفحة

  const handleLogout = () => {
    signOut(auth);
    navigate('/signin');
  };

  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <a className="navbar-brand" href="/">
            <img
              src="/logo2.svg"
              alt="OD Store Logo"
              width="40"
              height="40"
              style={{ marginRight: '10px' }}
            />
            OD Store
          </a>
        </div>

        <div className="d-flex align-items-center">
          <a href="/cart" className="btn ms-2 d-lg-none" style={{ fontSize: '1.5rem' }}>
            <i className="bi bi-cart-fill position-relative">
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.6rem', padding: '0.2em 0.5em' }}
              >
                {cartCount}
              </span>
            </i>
          </a>

          <button
            className="navbar-toggler p-2 ms-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list" style={{ fontSize: '1.2rem', color: '#333' }}></i>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-0 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="bi bi-house-door-fill me-2"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">
                <i className="bi bi-box-seam me-2"></i> Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                <i className="bi bi-info-circle-fill me-2"></i> About Us
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {user ? (
              <div className="dropdown ms-0">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-2" style={{ fontSize: '1.3rem' }}></i>
                  Hello, {userName || 'User'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <a className="btn btn-primary ms-3" href="/signin">
                Sign In
              </a>
            )}

            <a href="/cart" className="btn ms-2 d-none d-lg-block" style={{ fontSize: '1.5rem' }}>
              <i className="bi bi-cart-fill position-relative">
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.6rem', padding: '0.2em 0.5em' }}
                >
                  {cartCount}
                </span>
              </i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
