import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';
import styles from '../../styles/MessageList.module.css'; 

const MessageList = ({ receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true); // Start loading
            try {
                // Construct the URL for fetching messages
                const response = await axios.get(`${API_BASE_URL}messaging/messages/?receiver=${receiverId}`);
                console.log("Fetched Messages:", response.data); // Log fetched messages
                setMessages(response.data.results); // Set messages based on the API response
            } catch (error) {
                setError(error);
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        if (receiverId) {
            fetchMessages(); // Fetch messages if receiverId is available
        } else {
            console.error("Receiver ID is not defined."); // Log error if receiverId is missing
        }
    }, [receiverId]);

    if (loading) return <div>Loading messages...</div>; // Loading state
    if (error) return <div>Error fetching messages: {error.message}</div>; // Error state

    return (
        <ul className={styles.messageList}>
            {messages.map((message) => (
                <li key={message.id} className={styles.messageItem}>
                    {message.content} (from {message.sender}) {/* Adjust this if necessary */}
                </li>
            ))}
        </ul>
    );
};

export default MessageList;
