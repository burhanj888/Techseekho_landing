import React from 'react'
import "./Header2.css";
// import {Link} from "react-scroll"
// import axios from 'axios';

import { useState, useRef} from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Axios from '../../Api/Axios';
import useAuth from '../../Hooks/AuthHooks';
import ConfirmationModal from './ConfirmationModal';
import tslogo from './tslogo.png'

const ProtectedHeader = () => {

  const form = useRef();
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleShowSuccessModal = () => setShowSuccessModal(true);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async() => {
    // const history = useHistory();
    const confirmation = window.confirm("Are you sure you want to logout?");

    if (!confirmation) {
        return;
    }
    

        // Clear cookies
        await Axios.get('/logout', {
            withCredentials: true
        }).then(
            (response) => {
                console.log(response)
                localStorage.clear();

                    // Clear context
                    setUser(null);

                    navigate('/');
            }
        ).catch( (error)=> {
            console.log(error)
            if (error){
    
                    const errorMessage = 'Error logging out. Please try again later.'
                    setErrors({ general: errorMessage });
                
            }
            
        })
        
        
    }




    const sendEmail = async (event) => {
      event.preventDefault();
      const formData = new FormData(form.current);
  
      try {
        const response = await Axios.post('/sendMail', {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        });
        console.log('Email sent successfully:', response.data);
        handleCloseModal();
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };
    


  return (
    <>
    <section className="navbar-bg">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          
            <div className='logo-container'>
             
              <Link to='/videos'>
              <img className='logo' src={tslogo} alt="tech seekho logo"/>
              </Link>
            </div>
      
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
            
              
              <li className="nav-item">
                <Link className="nav-link" to="/videos">Classes</Link>
              </li>
             
             
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            </ul>
            <div className="social-links">
            <div className="call-button">
                <Link to='tel:9993604332'><i className='fa-solid fa-square-phone'></i></Link>
            </div>
            <div className="call-button">
            <Link to='https://wa.me/919993604332'><i className='fa-brands fa-square-whatsapp'></i></Link>
            </div>
            <div className="call-button">
      <Link to="https://www.facebook.com/people/Tech-Seekho/100090736860500/" target='_blank'>
        <i className="fab fa-facebook"></i>
      </Link>
      </div>
      <div className="call-button">
      <Link to="https://www.instagram.com/techseekho_com/" target='_blank'>
        <i className="fab fa-instagram"></i>
      </Link>
      </div>
      <div className="call-button">
      <Link to="https://twitter.com/techseekho_com" target='_blank'>
        <i className="fab fa-twitter"></i>
      </Link>
      </div>
      <div className="call-button">
      <Link to="https://www.youtube.com/@techseekho_com" target='_blank'>
        <i className="fab fa-youtube"></i>
      </Link>
      </div>
      
    </div>
            <div className="login-container">
        <button className="login-button" onClick={handleShowModal}>Contact Us</button>
      </div>

      <div className="login-container">
        <button className="login-button" onClick={handleLogout}>Log out</button>
      </div>
            
          </div>
        </div>
      </nav>
    </section>
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={form} onSubmit={sendEmail}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" name="name" required />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" name="email" required />
          </Form.Group>
          <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter your message" name="message" required />
          </Form.Group>
          <button variant="primary" type="submit" className="login-button" style={{ marginTop: "10px" }}>
            Send
          </button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* Optionally, you can add any footer content here */}
      </Modal.Footer>
    </Modal>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"green"}}>Mail Sent Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:"green", textAlign:"center", fontSize:"50px"}}>
        <i class="fa-regular fa-circle-check"></i>
        </Modal.Body>
        <Modal.Footer>
          
          <button variant="primary" onClick={handleCloseSuccessModal} className="login-button">
            Done
          </button>
        </Modal.Footer>
      </Modal>

      
    
    </>
 

  )
}

export default ProtectedHeader
