import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import "../Header2/Header2.css"
import { Link } from "react-router-dom";
import tslogo from "../Header/tslogo.png"

function Footer() {

 
 
  return (
    <>
    <footer style={{ backgroundColor:'grey', color:"white", marginTop:"20px"}}>
  <div class="container" style={{paddingTop: "40px"}}>
    <div class="row">
    <div class="col-xl-2 col-lg-3 col-md-6" style={{display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',}}>
    <img src={tslogo} style={{width: "180px", marginBottom:"20px"}}/>
    </div>
      <div class="col-xl-4 col-lg-6 col-md-6">
        <div>
          
          <h4 style={{color: "orange", fontWeight:"bold"}}>About Us</h4>
          <p class="mb-30 footer-desc" style={{textAlign:'left', backgroundColor:'grey', color:"white" }}>At TechSeekho, we empower students with the latest technical skills through our engaging and cutting-edge courses. 
          From coding to artificial intelligence, we equip students with the knowledge they need to thrive in a rapidly evolving world. 
          </p>
        </div>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-6">
        <div class="">
          <h4 style={{color: "orange", fontWeight:"bold"}}>Social Links</h4>
          
            <div className="social-links" >
            <div className="call-button">
                <Link style={{color: "black"}} to='tel:9993604332'><i className='fa-solid fa-square-phone'></i></Link>
            </div>
            <div className="call-button">
            <Link style={{color: "black"}} to='https://wa.me/919993604332'><i className='fa-brands fa-square-whatsapp'></i></Link>
            </div>
            <div className="call-button">
      <Link style={{color: "black"}} to="https://www.facebook.com/people/Tech-Seekho/100090736860500/" target='_blank'>
        <i className="fab fa-facebook"></i>
      </Link>
      </div>
      <div className="call-button">
      <Link style={{color: "black"}} to="https://www.instagram.com/techseekho_com/" target='_blank'>
        <i className="fab fa-instagram"></i>
      </Link>
      </div>
      <div className="call-button">
      <Link style={{color: "black"}} to="https://twitter.com/techseekho_com" target='_blank'>
        <i className="fab fa-twitter"></i>
      </Link>
      </div>
      <div className="call-button">
      <Link style={{color: "black"}} to="https://www.youtube.com/@techseekho_com" target='_blank'>
        <i className="fab fa-youtube"></i>
      </Link>
      </div>
      
    </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-6">
        <div>
          <h4 style={{color: "orange", fontWeight:"bold"}}>Address</h4>
          <ul class="list-unstyled">
            <li>
              <p style={{textAlign:'left'}} ><Link to="tel:9993604332" style={{color: "black"}}>+91-9993604332</Link></p>
            </li>
            <li>
              <p style={{textAlign:'left'}}><Link to="mailto:hello@techseekho.com" style={{color: "black"}}>hello@techseekho.com</Link>
              </p>
            </li>
            <li>
              <p style={{textAlign:'left'}}>Row House No 12 Orchid Shree Ram Enclave,
                Kumedi, Sanwer Link Road <br></br> Indore, 
                Indore MP 452010 India</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">

      <div class="copyright">
        <hr></hr>
        <p>All Right Reserved 2023, Developed by <Link to="https://varanyam.in" style={{color: "orange"}} target="_blank">Varanyam Technologies Pvt. Ltd.</Link></p>
      </div>
    </div>
  </div>
</footer>

</>
  
  )
}

export default Footer
