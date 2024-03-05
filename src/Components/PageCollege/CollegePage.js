import React from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Carousel from 'react-bootstrap/Carousel';
import "./forCollege.css";
import { forSchools, BenefitsforStudentsData, programs, online } from "./forCollege";
import CollegeHeader from '../Header2/CollegeHeader';
import '@fortawesome/fontawesome-free/css/all.css';

import Footer from '../Footer/Footer';
import { useState, useRef} from 'react';
import emailjs from '@emailjs/browser';
import carousel1 from './images/college c1.png'
import carousel2 from './images/college c2.png'
import carousel3 from './images/college C3.png'



const CollegeComponents = () => {
    const form = useRef();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const handleShowSuccessModal = () => setShowSuccessModal(true);
    const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("emailjs")

    emailjs.sendForm('service_pdgfa8g', 'template_abbkq4n', form.current, 'cEhby2bneSLwToKdo')
      .then((result) => {
          console.log(result);
          document.getElementById("college_tutor").reset();
          handleShowSuccessModal();
      }, (error) => {
          console.log(error.text);
      });
  };
    
  return ( 
    <>
        <CollegeHeader></CollegeHeader>
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
      <section >
      <div className="carousel-container">
      <Carousel interval={3000}>
        <Carousel.Item>
          <img
            className="carousel-image"
            src={carousel1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h2 className="carousel-title">Learn</h2>
            <p className="carousel-description">Expand Your Career Prospects through Engaging Learning and Practical Application!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src={carousel2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h2 className="carousel-title">Practice</h2>
            <p className="carousel-description">Master Technical Skills through Hands-on Practice and Real-world Projects!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src={carousel3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h2 className="carousel-title">Lead</h2>
            <p className="carousel-description">Become a Trailblazer in the Future of Technology with Cutting-edge Skills!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
    </section>
    <section id="benefits">


<Card className="card-style" style={{backgroundColor: "#99ccff"}}>
<Card.Body>
  <Card.Title><h2>Benefits for Students</h2></Card.Title>
  <Card.Text>
  As a student of TechSeekho you will get lots of benefits, some are mentioned here
  </Card.Text>
  <Row>
          {
            BenefitsforStudentsData.map(services => {
              return (

                <Col sm={3} className='col-style' key={services.id}>
                  <div className="BenefitsforSchoolsicon">
                    <i className={services.icon}></i>
                  </div>
                  <h3>{services.title}</h3>
                  <p>{services.description}</p>
                </Col>

                );
              })
            }
          </Row>
</Card.Body>
</Card>

</section>


 <section id="programs">
 <Container className='school-card-container'>
      <h2>Programs Available</h2>
      <h4>We offers various learning program students can join as per their need.</h4>
      <Row className='school-card-row'>
        {programs.map((card, index) => (
          <Col key={index} xs={12} sm={6} md={3}>
            <Card className='school-card'>
              <Card.Body>
              <div className="BenefitsforSchoolsicon">
                    <i class={card.icon}></i>
                  </div>
                <Card.Title className='school-card-title'>{card.title}</Card.Title>
                <Card.Text className='school-card-text'>{card.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </section>
    <section id="courses" className='online'>
        <div className='container_courses'>
          <h2>Courses we offer</h2>
          <div className='grid3'>
            {online.map((val) => (
              <div className='box'>
                <div className='img'>
                  <img src={val.cover} />
                </div>
                <h1>{val.courseName}</h1>
              </div>
            ))}
          </div>
        </div>
      </section>

<section id="for-teachers">
    <h2 className='for-schools-header'>For Tutors</h2>
      <Card className="forschool-custom-card">
      <Card.Body>
        <Row>
          <Col sm={6} >

          <Form ref={form} className="forschool-enquiry-form" id='college_tutor' onSubmit={sendEmail}>
              <Form.Group controlId="formName">
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
              <button type="submit" className="contact-button">Join Us</button>
            </Form>
            
          </Col>
          <Col sm={6} className="forschool-card-content">
          <h4 className="forschool-card-title">Calling all Educators! Join our EdTech Revolution!</h4>
            <p className="forschool-card-text">
            Dear Teachers, unlock your full teaching potential with our innovative platform.
             We offer competitive hourly pay, empowering you to inspire and educate students worldwide. 
             Embrace the future of education and become a part of our passionate community today! 
             Together, let's revolutionize learning for a brighter tomorrow.</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
</section>

<Footer></Footer>

</>

    
  )
}


export default CollegeComponents;
