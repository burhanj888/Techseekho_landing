import React from 'react'
import "./Header2.css";
import {Link} from "react-scroll"
import { useState, useRef} from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

const CollegeHeader = () => {

  const form = useRef();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleShowSuccessModal = () => setShowSuccessModal(true);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("emailjs")

    emailjs.sendForm('service_pdgfa8g', 'template_abbkq4n', form.current, 'cEhby2bneSLwToKdo')
      .then((result) => {
          console.log(result);
          setShowModal(false);
          handleShowSuccessModal();
      }, (error) => {
          console.log(error.text);
      });
  };
  
  return (
    <>
    <section className="navbar-bg">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          
            <div className='logo-container'>
             <a href='/'>
             <img className='logo' src="tslogo.png" alt="tech seekho logo"/>
             </a>
            </div>
      
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <Link className="nav-link" spy to="benefits">Benefits</Link>
              </li>


              <li className="nav-item">
                <Link className="nav-link" to="programs">Programs</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="courses">Courses</Link>
              </li>
             
             
              <li className="nav-item">
                <Link className="nav-link" to="for-teachers">For Tutors</Link>
              </li>
            </ul>
            <div className="social-links">
            <div className="call-button">
                <a href='tel:9993604332'><i className='fa-solid fa-square-phone'></i></a>
            </div>
            <div className="call-button">
            <a href='https://wa.me/919993604332'><i className='fa-brands fa-square-whatsapp'></i></a>
            </div>
            <div className="call-button">
      <a href="https://www.facebook.com/people/Tech-Seekho/100090736860500/" target='_blank'>
        <i className="fab fa-facebook"></i>
      </a>
      </div>
      <div className="call-button">
      <a href="https://www.instagram.com/techseekho_com/" target='_blank'>
        <i className="fab fa-instagram"></i>
      </a>
      </div>
      <div className="call-button">
      <a href="https://twitter.com/techseekho_com" target='_blank'>
        <i className="fab fa-twitter"></i>
      </a>
      </div>
      <div className="call-button">
      <a href="https://www.youtube.com/@techseekho_com" target='_blank'>
        <i className="fab fa-youtube"></i>
      </a>
      </div>
      
    </div>
            <div className="login-container">
        <button className="login-button" onClick={handleShowModal}>Contact Us</button>
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
          <Form ref={form}  onSubmit={sendEmail}>
            <Form.Group controlId="formName" onSubmit={sendEmail}>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" name="user_name" required/>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" name="user_email" required/>
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" name="message" required/>
            </Form.Group>
            <button variant="primary" type="submit" className="login-button" style={{marginTop: "10px"}}>
            Send
          </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
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

export default CollegeHeader
