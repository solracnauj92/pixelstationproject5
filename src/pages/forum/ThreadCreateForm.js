import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Forum.ThreadCreateForm.module.css';

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
    formData.append('forum', forumId);  // Ensure forum ID is sent
    if (image) formData.append('image', image);  // Add image if selected

    try {
      const response = await axios.post(`/forums/${forumId}/threads/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (onThreadCreated) onThreadCreated(response.data);
      setTitle('');
      setImage(null);
      setSuccess(true);
    } catch (err) {
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
