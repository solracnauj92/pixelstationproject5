import React, { useState, useEffect } from 'react';
import { axiosRes } from '../../api/axiosDefaults';  
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
            setMessage(response.data.msg);
            if (response.status === 201) {
                setEmail(''); 
                setName(''); 
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.msg || 'An error occurred. Please try again.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);  
        }
    };

    return (
        <div className="newsletter-container">
            <h1>Subscribe to Our Newsletter</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Newsletter;
