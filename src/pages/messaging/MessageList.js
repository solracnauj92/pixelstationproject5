import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MessageList.module.css';

const MessageList = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/messages/?receiver=${userId}`);
      setMessages(response.data);
    } catch (err) {
      setError('Error fetching messages');
      console.error('Error fetching messages:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMessages();
    }
  }, [userId]);

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.messageListContainer}>
      <h2>Messages</h2>
      <ul>
        {messages.length > 0 ? (
          messages.map((message) => (
            <li key={message.id} className={styles.messageItem}>
              <p className={styles.messageSender}><strong>From:</strong> {message.sender.username}</p>
              <p className={styles.messageContent}><strong>Message:</strong> {message.content}</p>
              <p className={styles.messageTimestamp}><strong>Sent at:</strong> {new Date(message.timestamp).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <p className={styles.noMessages}>No messages found.</p>
        )}
      </ul>
    </div>
  );
};

export default MessageList;
