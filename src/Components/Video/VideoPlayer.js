import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ProtectedHeader from '../Header2/ProtectedHeader';
import './VideoPlayer.css';

const VideoPlayer = () => {
    const location = useLocation();
    const { data } = location.state;
    const url = data.videoLink;
    const vidLink = url.replace('https://youtu.be/', '');

    return (
        <Container className="video-player-container">
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={8}>
                    <iframe 
                        title={data.title} 
                        className="video-iframe"
                        src={`https://www.youtube.com/embed/${vidLink}`} 
                        allowFullScreen
                    ></iframe>
                </Col>
            </Row>

            <Row className="justify-content-center mt-3">
                <Col xs={12} md={8}>
                    <Card style={{backgroundColor: "#99ccff"}}>
                        <Card.Body>
                            <Card.Title>
                                {data.title} <Badge variant="info">{data.className}</Badge>
                            </Card.Title>
                            <Card.Text style={{textAlign:"left"}}>
                                {data.description}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
                                <div>Course: {data.courseName}</div>
                                <div>Lecture: {data.lectureNo}</div>
                            </Card.Subtitle>
                            <Card.Footer className="d-flex justify-content-between">
                                <div><small className="text-muted">Tutor: {data.tutor}</small></div>
                                <div><small className="text-muted">Uploaded on: {new Date(data.updatedAt).toLocaleDateString()}</small></div>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default VideoPlayer;

