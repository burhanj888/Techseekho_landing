// src/components/WarningPage.js
import React from 'react';
import { Container, Alert, Image } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import ProtectedHeader from '../Header2/ProtectedHeader';

function WarningPage() {
    return (
        <div>
            <ProtectedHeader></ProtectedHeader>
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <Alert variant="danger" className="mb-4">
                <h4>You are not approved yet</h4>
            </Alert>
            <div style={{maxWidth: '600px'}}>
            <Image 
                src="UPIQR.png" 
                alt="Payment QR Image"
                className="img-fluid mb-4"
            />
            </div>
            
            
            <h5 className="text-center">
                If you have already paid, please wait for 48 hours or contact the admin at your institution.
            </h5>
            

        </Container>
        <Footer></Footer>
        </div>
    );
}

export default WarningPage;
