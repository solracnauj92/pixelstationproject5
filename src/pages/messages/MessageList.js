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

      const token = localStorage.getItem('token');
      console.log("Auth Token:", token); // Log token

      if (!token) {
        setError("You must be logged in to fetch messages.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/messages/?receiver=${receiverId}`, {
          headers: {
            Authorization: `Token ${token}`, // Ensure correct token type
          },
        });
        setMessages(response.data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(new Error("An error occurred while fetching messages."));
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
      {messages.length > 0 ? (
        messages.map((message) => (
          <li key={message.id} className={styles.messageItem}>
            <strong>{message.sender.username}:</strong> {message.content}
            <span className={styles.timestamp}>
              {new Date(message.timestamp).toLocaleString()}
            </span>
          </li>
        ))
      ) : (
        <li>No messages to display.</li>
      )}
    </ul>
  );
};

export default MessageList;
