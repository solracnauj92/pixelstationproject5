import React, { useState, useEffect } from 'react';
import { axiosRes } from '../../api/axiosDefaults';  
import styles from '../../styles/Newsletter.module.css'; // Assuming CSS module import

function Newsletter() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false); 

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                await axiosRes.get('/dj-rest-auth/user/'); 
                setIsUserAuthenticated(true); 
            } catch (error) {
                console.error("Error fetching current user:", error.response ? error.response.data : error.message);
                if (error.response) {
                    setMessage('Session expired. Please log in again.');
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

        try {
            const response = await axiosRes.post('/newsletter/', { email, name }); 
            setMessage(response.data.msg);
            if (response.status === 201) {
                setEmail(''); // Clear the email input
                setName('');  // Clear the name input
            }
        } catch (error) {
            console.error("Error submitting form:", error.response ? error.response.data : error.message);
            setMessage(error.response ? error.response.data.msg || 'An error occurred. Please try again.' : 'An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.newsletterContainer}> {/* Use styles from the imported CSS module */}
            <h1>Subscribe to Our Newsletter</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Subscribe</button>
            </form>
            {message && <p aria-live="assertive" className={styles.message}>{message}</p>} {/* Added aria-live for better accessibility */}
        </div>
    );
}

export default Newsletter;
