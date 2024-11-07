import React, { useState, useEffect } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import '../../styles/Newsletter.module.css';

function Newsletter() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                await axiosRes.get('/dj-rest-auth/user/');
                setIsUserAuthenticated(true);
            } catch (error) {
                if (error.response) {
                    console.error("Error response:", error.response.data);
                    setMessage('Session expired. Please log in again.');
                } else {
                    console.error("Error message:", error.message);
                }
            }
        };

        fetchCurrentUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !name) {
            setMessage('Please enter your name and email address.');
            return;
        }

        if (!isUserAuthenticated) {
            setMessage('You must be logged in to subscribe to the newsletter.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosRes.post('/newsletter/subscriptions/', { email, name });
            if (response.status === 201) {
                setMessage(`🎉 You've successfully subscribed to our newsletter! 🎉 \n\n Stay tuned for the latest updates and news from PixelStation!`);
                setEmail('');
                setName('');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setMessage('An error occurred. Please ensure this email has not been already registered.');
                } else {
                    setMessage(error.response.data.msg || 'An error occurred. Please try again.');
                }
            } else {
                setMessage('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            {/* Testimonial Section */}
            <Container className="mt-3">
                <Row className="text-center">
                    <Col>
                        <Image
                            src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729361504/media/images/gamer101_u8wv4s.jpg"
                            roundedCircle
                            className="mb-2"
                        />
                        <p><strong>Gamer101</strong></p>
                        <p>"Subscribing to the PixelStation newsletter has been awesome! I get all the latest game news, event updates, and exclusive invites straight to my inbox. It’s a great way to stay connected!"</p>
                    </Col>
                    <Col>
                        <Image
                            src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729288240/media/images/amandapika_i6imxx.jpg"
                            roundedCircle
                            className="mb-2"
                        />
                        <p><strong>AmandaPika</strong></p>
                        <p>"Being part of the PixelStation community is amazing! The newsletter keeps me updated on events, tournaments, and new releases. It’s the perfect way to stay in the loop!"</p>
                    </Col>
                </Row>
            </Container>

            {/* Join Newsletter Section */}
            <div className="bg-white p-4 my-4 rounded shadow-sm">
                <h2 className="text-center font-weight-bold text-uppercase mb-4">Join Our Newsletter</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Subscribing...' : 'Join Now'}
                    </Button>
                </Form>
                {message && <p className="mt-3">{message}</p>}
            </div>

            {/* Background Image Section */}
            <div className="mb-5">
                <img
                    src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1730893500/NSwitch_UpcomingGames_November_GB_en_tako2j.jpg"
                    alt="Gaming Background"
                    className="img-fluid rounded"
                />
            </div>
        </div>
    );
}

export default Newsletter;