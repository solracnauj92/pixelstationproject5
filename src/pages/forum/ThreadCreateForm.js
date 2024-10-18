import React, { useState } from 'react';
import axios from 'axios'; 
import styles from '../../styles/Forum.ThreadCreateForm.module.css';

const ThreadCreateForm = ({ forumId, onThreadCreated }) => { 
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    setError(null); 

    try {
    
      const response = await axios.post(`/forums/${forumId}/threads/`, { 
        title: title,
        forum: forumId, 
      });
      
      
      if (onThreadCreated) {
        onThreadCreated(response.data);
      }
      
      
      setTitle('');
    } catch (err) {
      setError('Error creating thread. Please try again.'); 
      console.error(err);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <form className={styles.threadCreateForm} onSubmit={handleSubmit}>
      <h2>Create a New Thread</h2>
      {error && <div className={styles.error}>{error}</div>} {/* Display error message */}
      <input
        type="text"
        placeholder="Thread title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit" disabled={isSubmitting}> {/* Disable button while submitting */}
        {isSubmitting ? 'Creating...' : 'Create Thread'}
      </button>
    </form>
  );
};

export default ThreadCreateForm;
