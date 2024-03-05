import React from 'react';
import './CardComponent.css';
import school from './School.png'
import college from './College.png'
import { Link } from 'react-router-dom';

const LandingCardComponent = () => {
  return (
    <div className="landing-card-container">
        <Link to='/school'>
      <div className="landing-card">
      <h3 className="landing-card-header">I am a school student</h3>
        <img src={school} alt="Card 1" className="landing-card-image" />
      </div>
      </Link>
      <Link to='/college'>
      <div className="landing-card">
      <h3 className="landing-card-header">I am a college student</h3>
        <img src={college} alt="Card 2" className="landing-card-image" />
        
      </div>
      </Link>
    </div>
  );
};

export default LandingCardComponent;
