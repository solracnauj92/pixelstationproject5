import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/MessageForm.module.css';

const MessageForm = ({ receiverId, onMessageSent }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/messages/', {
        receiver: receiverId,
        content: content,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) { 
        setContent(''); 
        setError(null);
        if (onMessageSent) onMessageSent(); 
      }
    } catch (err) {
      setError('Error sending message: ' + (err.response ? err.response.data.detail : err.message));
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
