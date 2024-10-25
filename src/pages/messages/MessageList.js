import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/MessageList.module.css';
import { API_BASE_URL } from '../../config';

const MessageList = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!receiverId) {
          throw new Error("Receiver ID is not defined.");
        }

        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/messages/?receiver=${receiverId}`, {
          headers: {
            Authorization: `Token ${token}`, // Ensure the token is sent
          },
        });

        setMessages(response.data); // Assuming that response.data contains the list of messages
      } catch (err) {
        setError(err);
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [receiverId]);

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>Error fetching messages: {error.message}</div>;

  return (
    <ul className={styles.messageList}>
      {messages.map((message) => (
        <li key={message.id} className={styles.messageItem}>
          <strong>{message.sender.username}:</strong> {message.content} 
          <span className={styles.timestamp}>{new Date(message.timestamp).toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
