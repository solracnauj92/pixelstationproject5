import React, { useState } from 'react';
import axios from 'axios'; 
import styles from '../../styles/Forum.ThreadCreateForm.module.css';

const ThreadCreateForm = ({ forumId, onThreadCreated }) => { 
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);  // Track success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    setError(null); 
    setSuccess(false);  // Reset success message on submit

    try {
      const response = await axios.post(`/forums/${forumId}/threads/`, { 
        title: title,
        forum: forumId, 
      });
      
      if (onThreadCreated) {
        onThreadCreated(response.data);
      }
      
      setTitle('');  // Clear title after submission
      setSuccess(true);  // Show success message
    } catch (err) {
      setError(err.response?.data?.detail || 'Error creating thread. Please try again.');  // Show detailed error message if available
      console.error(err);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <form className={styles.threadCreateForm} onSubmit={handleSubmit}>
      <h2>Create a New Thread</h2>
      {error && <div className={styles.error}>{error}</div>} {/* Display error message */}
      {success && <div className={styles.success}>Thread created successfully!</div>} {/* Display success message */}
      
      <input
        type="text"
        placeholder="Thread title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit" disabled={isSubmitting || !title}> {/* Disable button if submitting or title is empty */}
        {isSubmitting ? 'Creating...' : 'Create Thread'}
      </button>
    </form>
  );
};

export default ThreadCreateForm;
