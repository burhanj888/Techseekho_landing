import React, { useState, useRef } from 'react';
import Axios from '../../Api/Axios';
// import axios from 'axios';
import { Form, Button, Container, Modal, Row, Col, FloatingLabel } from 'react-bootstrap';
import './Register.css';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../Header/Header';


function StudentRegisterForm() {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        className:'',
        schoolName:'',
        phone:'',
        whatsappNo:'',
        address:'',
        courseName:'',
        dateOfBirth:'',
        gender:'',
        });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const navigate = useNavigate();
    const form = useRef();
    const handleNewStdChange = (e) => {
        const { name, value } = e.target;

        const adjustedValue = (name === "email") ? value.toLowerCase() : value;

        setFormData(prevState => ({
            ...prevState,
            [name]: adjustedValue
        }));
        validateField(name, value);
    }

    // const handleNewStdChange = (event) => {
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [event.target.name]: event.target.value
    //     }));
    //   };

    const handleAddNew = async (event) => {
        event.preventDefault();
        try {

            const { confirmPassword, ...dataToSend } = formData;
            console.log(dataToSend)
            console.log(formData)
        //   const token = localStorage.getItem('adminToken');
        //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await Axios.post(`/user/register`, dataToSend);
          console.log(response)
          if (response.data) {
            // const index = data.findIndex((video) => video._id === response.data._id);
            // setVideos([response.data, ...videos]);
            // newData[index] = newVidData;
            setFormData({
                name:'',
                email:'',
                password:'',
                confirmPassword,
                className:'',
                schoolName:'',
                phone:'',
                whatsappNo:'',
                address:'',
                courseName:'',
                dateOfBirth:'',
                gender:'',
            });
            // this.form.reset()
            setShowModal(true);
    
        } 
          
        } catch (error) {
          console.error(error);
          const errorMessage = error.response.data.message || "Error registering, Try again later.";
            setErrors({ general: errorMessage });
        }
      };

    const validateField = (name, value) => {
        let fieldErrors = {};
        switch (name) {
            case 'email':
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (!emailRegex.test(value)) fieldErrors.email = "Invalid email format.";
                else delete errors.email;
                break;

            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/;
                if (!passwordRegex.test(value)) fieldErrors.password = "Password must be at least 8 characters long with a mix of uppercase, lowercase letters, at least one number, and one special character.";
                else delete errors.password;
                break;

            case 'confirmPassword':
                if (value !== formData.password) fieldErrors.confirmPassword = "Passwords do not match.";
                else delete errors.confirmPassword;
                break;

            case 'phone':
                const phoneRegex = /^\+\d{1,4}\d{10}$/;
                if (!phoneRegex.test(value)) fieldErrors.phone = "Phone format should be: +[country code][10 digit number]";
                else delete errors.phone;
                break;
            case 'whatsappNo':
                const waRegex = /^\+\d{1,4}\d{10}$/;
                if (!waRegex.test(value)) fieldErrors.whatsappNo = "Number format should be: +[country code][10 digit number]";
                else delete errors.whatsappNo;
                break;

            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            ...fieldErrors
        }));
    }

    

    return (
        <div>
        <Header></Header>
        <Container className="d-flex-register justify-content-center align-items-center">
            
        <Form onSubmit={handleAddNew} ref={form}>
        <h2 className='mb-5'>Register to Access Recorded Classes</h2>
        <Form.Group className="mb-2" controlId="name">
        <Form.Label>Your Name</Form.Label>
        <Form.Control
            type="text"
            name="name"
            placeholder="Enter Your Name"
            onChange={handleNewStdChange}
            required
        />
    </Form.Group>
    
    <Form.Group className="mb-2" controlId="email">
        <Form.Label>Your Email</Form.Label>
        <Form.Control
            type="text"
            name="email"
            placeholder="Enter Your Email"
            onChange={handleNewStdChange}
            required
            isInvalid={errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
    </Form.Group>
<Row>
<Col xs={12} md={6}>
    <Form.Group className="mb-2" controlId="password">
        <Form.Label>Strong Password</Form.Label>
        <Form.Control
            type="password"
            name="password"
            placeholder="Enter Your Password"
            onChange={handleNewStdChange}
            required
            isInvalid={errors.password}
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
    </Form.Group>
    </Col>
    <Col xs={12} md={6}>
    <Form.Group className="mb-2" controlId="password">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Re-Enter Your Password"
            onChange={handleNewStdChange}
            required
            isInvalid={errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
    </Form.Group>
    </Col>
</Row>
    
        <Row>
        <Col xs={12} md={6}>
    <Form.Group className="mb-2" controlId="phone">
        <Form.Label>Mobile Phone Number</Form.Label>
        <Form.Control
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            onChange={handleNewStdChange}
            required
            isInvalid={errors.phone}
        />
        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
    </Form.Group>
    </Col>
    <Col xs={12} md={6}>
    <Form.Group className="mb-2" controlId="whatsApp">
        <Form.Label>Whatsapp Number</Form.Label>
        <Form.Control
            type="text"
            name="whatsappNo"
            placeholder="Enter Whastapp Number"
            onChange={handleNewStdChange}
            required
            isInvalid={errors.whatsappNo}
        />
        <Form.Control.Feedback type="invalid">{errors.whatsappNo}</Form.Control.Feedback>
    </Form.Group>
    </Col>
    </Row>
    <Row>
        <Col xs={12} md={6}>
        <Form.Group className="mb-2" controlId="class">
            <Form.Label>Your Class</Form.Label>
            <Form.Control as="select" name="className" onChange={handleNewStdChange} required>
                <option value="">Select</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
                <option value="college">College Student</option>
                {/* ... add other class options ... */}
            </Form.Control>
        </Form.Group>
        </Col>
        <Col xs={12} md={6}>
        <Form.Group as={Col} className="mb-2" controlId="course">
            <Form.Label>Your Course</Form.Label>
            <Form.Control as="select" name="courseName" onChange={handleNewStdChange} required>
                <option value="">Select</option>
                <option value="python">Python with AI</option>
                <option value="html">Web Development</option>
                {/* ... add other course options ... */}
            </Form.Control>
        </Form.Group>
        </Col>
    </Row>

    <Form.Group as={Col} className="mb-2" controlId="school">
        <Form.Label>School Name</Form.Label>
        <Form.Control
            type="text"
            name="schoolName"
            placeholder="Your School Name"
            onChange={handleNewStdChange}
            required
        />
    </Form.Group>

    <Row>
    <Col xs={12} md={6}>
        <Form.Group className="mb-2" controlId="DOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
            type="date"
            name="dateOfBirth"
            placeholder="Your Date of Birth"
            onChange={handleNewStdChange}
            required
        />
        </Form.Group>
        </Col>
        <Col xs={12} md={6}>
        <Form.Group className="mb-2" controlId="gender">
            <Form.Label>Your Gender</Form.Label>
            <Form.Control as="select" name="gender" onChange={handleNewStdChange} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </Form.Control>
        </Form.Group>
        </Col>
    </Row>

    <Form.Group as={Col} className="mb-2" controlId="address">
        <Form.Label>Your Address</Form.Label>
        <Form.Control
            as="textarea" rows={3}
            name="address"
            placeholder='Your Current Address'
            onChange={handleNewStdChange}
            required
        />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
          >
            </Form.Check>
            <Link to='/tnc'>Terms & Conditions</Link>
      </Form.Group>
            
            <Button className='btn-register'  type="submit">
              Add New Student
            </Button>
            {errors.general && <p className="text-danger text-center">{errors.general}</p>}

                <p>
                    Already an Registered? <Link to="/">Login</Link>
                </p>
          </Form>
            <Modal show={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome</Modal.Title>
                </Modal.Header>
                <Modal.Body>Registered successfully! Login to access portal.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowModal(false); navigate('/');}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </div>
    );
}

export default StudentRegisterForm;
