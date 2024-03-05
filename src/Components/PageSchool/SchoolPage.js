import React from 'react'
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./forSchools.css";
import { forSchools, BenefitsforStudentsData, programs, online } from "./forSchool";
import SchoolHeader from '../Header2/SchoolHeader';
import '@fortawesome/fontawesome-free/css/all.css';

import IntroSection from './ForSchoolIntro/IntroSection';
import Footer from '../Footer/Footer';
import { useState, useRef} from 'react';
import emailjs from '@emailjs/browser';

const SchoolComponents = () => {
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
          document.getElementById("school_school").reset();
        //   document.getElementById("school_tutor").reset();
          handleShowSuccessModal();
      }, (error) => {
          console.log(error.text);
      });
  };
  return ( 
    <>
        <SchoolHeader></SchoolHeader>
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
      <IntroSection></IntroSection>
      
    <section id="benefits">
<Card className="card-style2">
<Card.Body>
  <Card.Title><h2>Benefits for Students</h2></Card.Title>
  <Card.Text>
    Why you should join TechSeekho and what benefits you will get
  </Card.Text>
  <Row>
          {
            BenefitsforStudentsData.map(BenefitsforStudents => {
              return (

                <Col sm={4} className= 'col-style2' key={BenefitsforStudents.id}>
                  <div className="BenefitsforSchoolsicon">
                    <i className={BenefitsforStudents.icon}></i>
                  </div>
                  <h3>{BenefitsforStudents.title}</h3>
                  <p>{BenefitsforStudents.description}</p>
                </Col>

                );
              })
            }
          </Row>
</Card.Body>
</Card>

<Card className="card-style" style={{backgroundColor: "#98e6e6"}}>
<Card.Body>
  <Card.Title><h2>Benefits for Schools</h2></Card.Title>
  <Card.Text>
    Joining TechSeekho is beneficial not only to students but also to schools
  </Card.Text>
  <Row>
          {
            forSchools.map(services => {
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
      <h4>We offers various learning programs student can join as per their need or join through their school institution.</h4>
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
<section id="for-schools">
    <h2 className='for-schools-header'>For Schools</h2>
      <Card className="forschool-custom-card">
      <Card.Body>
        <Row>
          <Col sm={6} className="forschool-card-content">
            <h4 className="forschool-card-title">Let's shape the future together!</h4>
            <p className="forschool-card-text">Join the education revolution! <br></br>
            Empower your students with <br></br> cutting-edge learning tools and resources.<br></br>
             Partner with us and unlock limitless potential. <br></br>
             Contact us using this form for any enquiry.</p>
          </Col>
          <Col sm={6}>
            
            <Form ref={form} className="forschool-enquiry-form" id='school_school' onSubmit={sendEmail}>
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
              <button type="submit" className="contact-button">Partner with us</button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
</section>

{/* <section id="for-teachers">
    <h2 className='for-schools-header'>For Tutors</h2>
      <Card className="forschool-custom-card">
      <Card.Body>
        <Row>
          <Col sm={6} >

          <Form ref={form} className="forschool-enquiry-form" id='school_tutor'  onSubmit={sendEmail}>
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
</section> */}

<Footer></Footer>
</>

    
  )
}


export default SchoolComponents;
