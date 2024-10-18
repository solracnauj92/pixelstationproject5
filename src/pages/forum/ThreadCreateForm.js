import React, { useState } from 'react';
import styles from '../../styles/Forum.ThreadCreateForm.module.css';

const ThreadCreateForm = ({ forumId }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle thread creation here (e.g., API call)
  };

  return (
    <form className={styles.threadCreateForm} onSubmit={handleSubmit}>
      <h2>Create a New Thread</h2>
      <input
        type="text"
        placeholder="Thread title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Create Thread</button>
    </form>
  );
};

export default ThreadCreateForm;
