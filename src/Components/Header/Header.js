import React from 'react';
import './Header.css';
import { useNavigate, Link } from 'react-router-dom';

import tslogo from './tslogo.png'


const Header = () => {
  

  
  return (
    <header className="sticky-header">
      <div className="logo-container">
       <Link to='/'><img src={tslogo} alt="Logo" className="logo" /></Link>
      </div>
    </header>
  );
};

export default Header;
