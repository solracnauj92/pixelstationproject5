import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const MessageList = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMessages = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/messages/?receiver=${userId}`);
            setMessages(response.data);
        } catch (err) {
            setError('Error fetching messages');
            console.error('Error fetching messages:', err.response ? err.response.data : err.message);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchMessages();
        }
    }, [userId, fetchMessages]); // Added fetchMessages here

    if (loading) return <p>Loading messages...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <li key={message.id}>
                            <p><strong>From:</strong> {message.sender.username}</p>
                            <p><strong>Message:</strong> {message.content}</p>
                            <p><strong>Sent at:</strong> {new Date(message.timestamp).toLocaleString()}</p>
                        </li>
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </ul>
        </div>
    );
};

export default MessageList;
