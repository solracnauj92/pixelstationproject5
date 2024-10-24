import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/MessageForm.module.css';
import { API_BASE_URL } from '../../config'; 

const MessageForm = ({ receiverId, onMessageSent }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}api/messages/`, { 
        receiver: receiverId,
        content: content,
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      });
      setContent(''); 
      setError(null);
      if (onMessageSent) onMessageSent(); 
    } catch (err) {
      console.error('Error sending message:', err); 
      setError('Error sending message: ' + (err.response ? err.response.data.detail || err.message : err.message));
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
        <button type="submit" className={styles.button}>Send Message</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default MessageForm;
