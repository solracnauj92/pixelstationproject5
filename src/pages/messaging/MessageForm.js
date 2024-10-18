import React, { useState } from 'react';
import axios from 'axios';
import styles from './MessageForm.module.css';

const MessageForm = ({ userId }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/messages/', {
        receiver: userId,
        content: content,
      });
      setContent('');
      setError(null);
    } catch (err) {
      setError('Error sending message');
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
