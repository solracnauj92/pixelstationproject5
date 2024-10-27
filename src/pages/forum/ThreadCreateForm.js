import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Forum.ThreadCreateForm.module.css';
import { getAuthToken } from '../../utils/utils';

const ThreadCreateForm = ({ forumId, onThreadCreated }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('forum', forumId);  
    if (image) formData.append('image', image); 

    const token = getAuthToken(); 
    console.log('Access Token:', token); 
    if (!token) {
      setError('No valid token found. Please log in again.');
      setIsSubmitting(false);
      return; 
    }

    try {
      const response = await axios.post(`/forums/${forumId}/threads/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, 
        },
      });
      if (onThreadCreated) onThreadCreated(response.data);
      setTitle('');
      setImage(null);
      setSuccess(true);
    } catch (err) {
      console.error('Error creating thread:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.detail || 'Error creating thread.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.threadCreateForm} onSubmit={handleSubmit}>
      <h2>Create a New Thread</h2>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>Thread created successfully!</div>}

      <input
        type="text"
        placeholder="Thread title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input type="file" onChange={handleImageChange} />
      <button type="submit" disabled={isSubmitting || !title}>
        {isSubmitting ? 'Creating...' : 'Create Thread'}
      </button>
    </form>
  );
};

export default ThreadCreateForm;