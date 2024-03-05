// YouTubeVideo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form } from 'react-bootstrap';
import VideoCard from './VideoCard';
import useAuth from '../../Hooks/AuthHooks';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import './Video.css'

const VideosComponent = () => {
    const [videos, setVideos] = useState([]);
    const [param, setParam] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const { user } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const user = JSON.parse(localStorage.getItem('student'))

        // Fetch all videos from your API
        const getVideos = async () => {
            try {
                const response = await axiosPrivate.get(`/video/videos?forClass=${user.className}&courseName=${user.courseName}`, {
                    // signal: controller.signal
                });
                console.log(response.data);
                isMounted && setVideos(response.data);
                setFilteredData(response.data);
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getVideos();

        return () => {
            isMounted = false;
            controller.abort();
        }

        // const token = localStorage.getItem('token');
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // axios.get('http://localhost:8000/api/video')
        //     .then(response => {
        //         setVideos(response.data);
        //         setFilteredData(response.data);
        //     })
        //     .catch(error => console.error("Error fetching videos:", error));
    }, []);

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = videos.filter(
          (video) =>
          video.title.toLocaleLowerCase().includes(keyword) ||
        //   video._id.toLocaleLowerCase().includes(keyword) ||
          video.courseName.toLocaleLowerCase().includes(keyword) ||
          video.lectureNo.toLocaleLowerCase().includes(keyword) ||
          video.forClass.includes(keyword) ||
          video.tutor.toLocaleLowerCase().includes(keyword)
        );
        setParam(keyword);
        setFilteredData(filtered);
      };

    return (
        <Container>
            <Form.Group controlId="search" className='search'>
            <Form.Control
                className="search-input"
                type="text"
                placeholder="Search by Video Title, Id, Course Name, Lecture No., Class, or Tutor Name"
                value={param}
                onChange={handleSearch}
            />
            </Form.Group>
            <Row>
                {filteredData.map(video => (
                    <Col md={4} key={video._id}>
                        <VideoCard video={video} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default VideosComponent;
