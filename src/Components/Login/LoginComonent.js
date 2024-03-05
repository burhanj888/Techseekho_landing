// In your login component
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { login } from '../../Utils/Api';
import { Modal, Button, Form, FloatingLabel, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Axios from '../../Api/Axios';
// import axios from 'axios';
import './LoginModel.css'
import ForgotPasswordModal from '../ForgotPassword/ForgotPassword';
// import '../Header2/Header2.css'



const Login = ({ show, toggle }) => {
    
    const { user, setUser } = useContext(AuthContext);
    const [rawEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const handleShowSuccessModal = () => setShowSuccessModal(true);
    const handleCloseSuccessModal = () => setShowSuccessModal(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("in login")
     
            const email = rawEmail.toLocaleLowerCase();
            console.log(email);
            await Axios.post('/user/login', {email, password }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }).then(
                (response) => {
                    console.log(response)
                    if (response.data && response.data.accessToken) {
                        console.log(response.data)
                        localStorage.setItem("student", JSON.stringify(response.data) )
                        setUser(response.data)
                        handleClose();
                        handleShowSuccessModal();
                    } 
                }
            ).catch( (error)=> {
                console.log(error)
                if (error){
                    if(error.response.status == '401'){
                        console.log("yes")
                        const errorMessage = "Invalid Credentials!";
                        setErrors({ general: errorMessage });
                    }
                    else {
                        const errorMessage = 'Error logging in. Please try again later.'
                        setErrors({ general: errorMessage });
                    }
                }
                
            }).finally( () => {
                setLoading(false);
            }

            )
            
      
    };

    const handleClose = () => {
        toggle();
    }



    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Welcome back Champ!</h4>
          {errors.general && <Alert variant="danger" className="login-error">{errors.general}</Alert>}
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
          <div className="login-button-container">
          <Button className="login-modal-btn" type="submit" disabled={loading}>
            {loading ? "Login in..." : "Login"}
          </Button>
          </div>
          </Form>
          
        </Modal.Body>
        <Modal.Footer className='modal-login-footer'>
        <div>
          <p>New to TechSeekho? <Link to="/register">Register</Link></p>
        </div>

        <div>
          <p>Forgot Password?{' '}
            <Link to="#" onClick={() =>(setShowForgotPasswordModal(true), handleClose()) }>
              <Button variant="link" style={{ border: 'none', padding: 0 }}>
                Reset
              </Button>
            </Link>
          </p>
        </div>
        </Modal.Footer>
      </Modal>
      {showForgotPasswordModal && (
        <ForgotPasswordModal
          show={showForgotPasswordModal}
          handleClose={() => setShowForgotPasswordModal(false)}
        />
      )}

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"green"}}>Hooray! Login Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:"green", textAlign:"center", fontSize:"50px"}}>
        <i class="fa-regular fa-circle-check"></i>
        </Modal.Body>
        <Modal.Footer>
          
          <button variant="primary"  onClick={() => {handleShowSuccessModal(); navigate('/videos');}} className="login-button">
            Done
          </button>
        </Modal.Footer>
      </Modal>
      </>
    );
};

export default Login
