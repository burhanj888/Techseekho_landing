import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Table } from 'react-bootstrap';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import './UserProfile.css'; 

const UserProfile = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const user = JSON.parse(localStorage.getItem('student'));

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                
                const response = await axiosPrivate.get(`/user/${user._id}`)
                // const response = await axios.get('/api/student/details'); // Adjust the endpoint as needed
                console.log('user',response)
                setStudentData(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handlePasswordChange = async (e) => {
        e.preventDefault();
            console.log(newPassword, currentPassword)
            if (newPassword === confirmPassword) {
                // Call the API to change the password
                try {
                    const response = await axiosPrivate.put('/user/updatePassword', {
                        currentPassword,
                        newPassword,
                    });
                    if (response.data.success) {
                        console.log(response)
                        alert('Password changed successfully!');
                    } else {
                        console.log(response)
                        alert('Error: ' + response.data.message);
                    }
                } catch (error) {
                    console.log(error)
                    alert(error);
                }
            finally {
                // Clear the fields after the request is completed
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
            } else {
                alert('New password and confirmation do not match.');
            }
        
        
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
            <Col md={8}>
            <h3 className='user-profile-card-header'>My Profile</h3>
            <Table bordered hover className="user-profile-table">
            <tbody>
                <tr>
                    <td><strong>Name:</strong></td>
                    <td>{studentData?.name}</td>
                </tr>
                <tr>
                    <td><strong>Email:</strong></td>
                    <td>{studentData?.email}</td>
                </tr>
                <tr>
                    <td><strong>Class Name:</strong></td>
                    <td>{studentData?.className}</td>
                </tr>
                <tr>
                    <td><strong>Course Name:</strong></td>
                    <td>{studentData?.courseName}</td>
                </tr>
                <tr>
                    <td><strong>School Name:</strong></td>
                    <td>{studentData?.schoolName}</td>
                </tr>
                <tr>
                    <td><strong>Phone:</strong></td>
                    <td>{studentData?.phone}</td>
                </tr>
                <tr>
                    <td><strong>WhatsApp Number:</strong></td>
                    <td>{studentData?.whatsappNo}</td>
                </tr>
                <tr>
                    <td><strong>Address:</strong></td>
                    <td>{studentData?.address}</td>
                </tr>
                <tr>
                    <td><strong>Date of Birth:</strong></td>
                    <td>{new Date(studentData?.dateOfBirth).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td><strong>Gender:</strong></td>
                    <td>{studentData?.gender}</td>
                </tr>
            </tbody>
        </Table>
        <div className="change-password-section">
                <h2>Change Password</h2>
                <Form onSubmit={handlePasswordChange}>
                    <Form.Group className="change-password-form-group">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="change-password-form-control"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="change-password-form-group">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="change-password-form-control"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="change-password-form-group">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="change-password-form-control"
                            required
                        />
                    </Form.Group>
                    <Button className="change-password-button" type="submit">Update Password</Button>
                </Form>
            </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
