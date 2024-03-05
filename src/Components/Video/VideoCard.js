// VideoCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import { Link } from 'react-router-dom';
import './Video.css'

const VideoCard = ({ video }) => {
    console.log(video)
    const url = video.videoLink
    const vidLink = url.replace('https://youtu.be/', '');

    return (
        <Card className="video-card mt-5">
            <Link to={`/video/${video._id}`} state={{ data: video }} className="video-card-link">
                <Card.Header className="video-card-header">
                    <strong>Course: {video.courseName}</strong>
                    <br />
                    <strong>Lecture number: {video.lectureNo}</strong>
                </Card.Header>
                <Card.Img variant="top" src={`https://img.youtube.com/vi/${vidLink}/0.jpg`} className="video-card-img" />
                <Card.Body className="video-card-body">
                    <Card.Title className="video-card-title">
                        <h3><strong>{video.title}</strong></h3>
                    </Card.Title>
                    <Button variant="primary" href={video.videoLink} className="video-card-button">Watch</Button>
                </Card.Body>
            </Link>
        </Card>

    );
};

export default VideoCard;
