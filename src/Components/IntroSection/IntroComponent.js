import React from 'react';
import './BoxComponent.css';
import { Link } from 'react-router-dom';

const IntroComponent = () => {
  return (
    <div className="box-container">
      <div className="box-content">
        <h2 className="box-heading">TECH SEEKHO</h2>
        <h3 className="box-subheading">Get Future Ready!</h3>
        <p className="box-paragraph">
        Unleash your tech prowess with our platform!<br></br> 
        {/* Learn trending technical skills, earn completion certificates, and seize internship opportunities.<br></br> */}
        Embrace a future filled with limitless career possibilities in the world of technology!
        </p>
        <Link to='/school'><button className="get-started-button">Get Started</button></Link>
      </div>
    </div>
  );
};

export default IntroComponent;
