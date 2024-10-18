import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API calls
import styles from '../../styles/Forum.ThreadCreateForm.module.css';

const ThreadCreateForm = ({ forumId, onThreadCreated }) => { // Added onThreadCreated prop
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null); // State for error handling
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state
    setError(null); // Reset error state

    try {
      const response = await axios.post('/api/threads/', {
        title: title,
        forum: forumId, // Associate the thread with the selected forum
      });
      
      // Call onThreadCreated if provided to inform parent component of new thread
      if (onThreadCreated) {
        onThreadCreated(response.data);
      }
      
      // Clear the title after successful submission
      setTitle('');
    } catch (err) {
      setError('Error creating thread. Please try again.'); // Set error message
      console.error(err);
    } finally {
      setIsSubmitting(false); // Reset loading state
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
