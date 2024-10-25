import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/MessageForm.module.css';
import { API_BASE_URL } from '../../config';

const MessageForm = ({ receiverId, currentUser, onMessageSent }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token'); // Get the token for authenticated request

      await axios.post(`${API_BASE_URL}/messages/`, {
        receiver: receiverId,  // Set the receiverId from props
        content: content,
      }, {
        headers: {
          Authorization: `Token ${token}`, // Send the auth token in the headers
        },
      });

      setContent(''); // Clear the message content
      if (onMessageSent) onMessageSent(); // Callback after message is sent
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error sending message: ' + (err.response ? err.response.data.detail || err.message : err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
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
