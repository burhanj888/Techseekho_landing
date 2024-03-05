import React, { useState } from 'react';
import { Form, Button, Alert, FloatingLabel } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

// import axios from 'axios';
import './ResetPassword.css';
import Header from '../Header/Header';
import Axios from '../../Api/Axios';



const ResetPasswordPage = ({ handleResetPassword }) => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      console.log(token)
      if (newPassword !== confirmNewPassword) {
        setError("Passwords don't match.");
        setSuccess('');
        return;
      }
  
      
        await Axios.post('/reset-password', { token, newPassword })
        .then(
            (response) => {
                if (response.status === 200) {
                    setSuccess(response.data.message);
                    setError(null);
                    setNewPassword('');
                    setConfirmNewPassword('');
                    alert('Password Reset Successfully!')
                    navigate('/')

                  } else if (response.status === 400){
                    setError('Reset Password link no more valid.');
                    setSuccess('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                  }
            }
        ).catch( (error)=> {
            console.log(error)
            if (error.response.status === 400){
                setError('Reset Password link no more valid.');
                setSuccess('');
                setNewPassword('');
                setConfirmNewPassword('');
              }
            else{
                setError('Reset Password failed. Try again later.');
                    setSuccess('');
                    setNewPassword('');
                    setConfirmNewPassword('');
            }
            
        })
      };
       
  
  return (
    <div>
        <Header></Header>
    
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2>Reset Password</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form className='reset-password-form ' onSubmit={handleSubmit}>
          
          <FloatingLabel
            controlId="Password"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            </FloatingLabel>
            <FloatingLabel
            controlId="ConfPassword"
            label="Confirm Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            </FloatingLabel>
          
          <Button className="reset-password-button" type="submit">
            Reset Password
          </Button>
        
        </Form>
      </div>
    </div>
    </div>
  );
};

export default ResetPasswordPage;
