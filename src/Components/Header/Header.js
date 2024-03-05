import React from 'react';
import './Header.css';
import { useState, useRef} from 'react';
import { Navbar, Nav, Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { useNavigate, Link } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import Login from '../Login/LoginComonent';
import tslogo from './tslogo.png'


const Header = () => {
  const form = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [rawEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  // const [showSuccessModal, setShowSuccessModal] = useState(false);


  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleShowSuccessModal = () => setShowSuccessModal(true);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const email = rawEmail.toLocaleLowerCase();
        console.log(email);
        const response = await axios.post('http://localhost:8000/api/user/login', {email, password });
        console.log(response)
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data._id);
            localStorage.setItem('isApproved', response.data.approved);
            localStorage.setItem('className', response.data.className);
            localStorage.setItem('courseName', response.data.courseName);
            handleClose();
            handleShowSuccessModal();
        } 
    } catch (error) {
        console.log(error.response.status)
        if(error.response.status === '401'){
            const errorMessage = "Invalid Credentials!";
            setErrors({ general: errorMessage });
        }
        else {
            const errorMessage = 'Error logging in. Please try again later.'
            setErrors({ general: errorMessage });
        }
    }
    finally {
        setLoading(false);
    }
}

const toggleLoginModal = () => {
  setShowLogin(!showLogin);
}


  const sendEmail = (e) => {
    e.preventDefault();
    console.log("emailjs")
    console.log(form)
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
    <header className="sticky-header">
      <div className="logo-container">
       <Link to='/'><img src={tslogo} alt="Logo" className="logo" /></Link>
      </div>
      {/* <div className='call-button'>
                <a className='icon' href='tel:9993604332'><i className='fa-solid fa-square-phone'></i></a>
            </div>
            <div className='call-button'>
            <a className='icon' href='https://wa.me/919993604332'><i className='fa-brands fa-square-whatsapp'></i></a>
            </div> */}
      {/* <div className="login-container">
        <Link to="/register">
        <button className="login-button">Register</button>
        </Link>
      </div> */}
      {/* <div className="login-container">
        <button className="login-button" onClick={handleShow}>Login</button>
      </div> */}
      <Login show={showLogin} toggle={toggleLoginModal}></Login>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form} onSubmit={sendEmail}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" name="user_name" required="true" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" name="user_email" required/>
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" name="message" required/>
            </Form.Group>
            <button type="submit" className="login-button" style={{marginTop: "10px"}}>
            Send
          </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>


      {/* <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"green"}}>Hooray! Login Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:"green", textAlign:"center", fontSize:"50px"}}>
        <i class="fa-regular fa-circle-check"></i>
        </Modal.Body>
        <Modal.Footer>
          
          <button variant="primary" onClick={() => {handleShowSuccessModal(); navigate('/videos');}} className="login-button">
            Done
          </button>
        </Modal.Footer>
      </Modal> */}

      {/* <Modal show={showLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Welcome back Champ!</h4>
          <Form onSubmit={handleLogin}>
          <FloatingLabel
            controlId="Email"
            label="Email address"
            className="mb-3"
          >
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={rawEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          </FloatingLabel>
          <FloatingLabel
            controlId="Password"
            label="Password"
            className="mb-3"
          >
          <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
          />
          </FloatingLabel>
          <Button variant='primary' type="submit" disabled={loading}>
            {loading ? "Login in..." : "Login"}
          </Button>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
        <p>
              New to TechSeekho? <Link to="/register">Register</Link>
          </p>
        </Modal.Footer>
      </Modal> */}
      {/* <Modal show={showSuccessModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Admin Login successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowModal(false); navigate('/manage-students');}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
    </header>
  );
};

export default Header;
