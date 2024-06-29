import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Holidays</Link>
      <button className="navbar-toggler" type="button" onClick={toggleNav}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/news">World News</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/countryinfo">Country Information</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/restInfo">Rest Countries</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/weather">Weather</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/currencies">Currency</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
