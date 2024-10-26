import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/MessageForm.module.css';
import { API_BASE_URL } from '../../config';
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const MessageForm = ({ receiverId, onMessageSent }) => {
  const currentUser = useCurrentUser();
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    console.log("Auth Token:", token);

    if (!token) {
      setError('You must be logged in to send messages.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/messages/`, {
        receiver: receiverId,
        content: content,
      }, {
        headers: {
          Authorization: `Token ${token}`, // or `Bearer ${token}`
        },
      });

      setContent('');
      if (onMessageSent) onMessageSent();
    } catch (err) {
      console.error('Error sending message:', err.response ? err.response.data : err);
      setError('Error sending message: ' + (err.response ? err.response.data.detail || err.message : err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {currentUser && <p>Logged in as: {currentUser.username}</p>} {/* Use currentUser */}
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Type your message"
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default MessageForm;
