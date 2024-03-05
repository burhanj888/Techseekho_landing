import React, { useState } from 'react';
import Axios from '../../Api/Axios';
// import axios from 'axios';
import { Modal, Alert, Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPasswordModal = ({ show, handleClose}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    await Axios.post('/forgot-password', { email })
      .then(
        (response) => {
            console.log(response)
            const successMsg = "Reset Password mail sent, check your mail box."
            setMessage(successMsg);
            setEmail('');
            setError(null);
        }
    ).catch( (error)=> {
        console.log(error)
        if (error){
            if(error.response.status == '404'){
                setEmail('');
                const errorMessage = "User not found with this email";
                setError(errorMessage );
            }
            else {
                const errorMessage = 'Error updating password. Please try again later.'
                setError(errorMessage );
            }
        }
        
    })
  };

  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleForgotPassword}>
        <FloatingLabel
            controlId="Email"
            label="Email address"
            className="mb-3"
          >
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          </FloatingLabel>
          <div className="login-button-container" style={{width: "50%"}}>
          <Button className="reset-password-button" type="submit">
            Reset Password
            {/* {loading ? "Login in..." : "Login"} */}
          </Button>
          </div>
        </Form>
        
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
