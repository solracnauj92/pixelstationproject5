// src/pages/forum/Forum.js
import React, { useState } from 'react';
import ForumList from './ForumList';
import ThreadList from './ThreadList';
import PostList from './PostForum.js';
import ThreadCreateForm from './ThreadCreateForm';
import styles from '../../styles/Forum.module.css';

const Forum = () => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showThreadCreateForm, setShowThreadCreateForm] = useState(false); // State to manage visibility of thread creation form

  const handleForumSelect = (forumId) => {
    setSelectedForum(forumId);
    setSelectedThread(null);
    setShowThreadCreateForm(true); // Show thread create form when a forum is selected
  };

  const handleThreadSelect = (threadId) => {
    setSelectedThread(threadId);
    setShowThreadCreateForm(false); // Hide thread create form when a thread is selected
  };

  const handleCloseThreadCreateForm = () => {
    setShowThreadCreateForm(false); // Function to close the thread creation form
  };

  return (
    <div className={styles.forumContainer}> {/* Apply styles from the CSS module */}
      <h1 className={styles.forumHeading}>Forum Page</h1>
      <ForumList onSelectForum={handleForumSelect} />
      {selectedForum && (
        <>
          <ThreadList forumId={selectedForum} onSelectThread={handleThreadSelect} />
          {showThreadCreateForm && (
            <div className={styles.threadCreateForm}>
              <ThreadCreateForm forumId={selectedForum} onClose={handleCloseThreadCreateForm} />
            </div>
          )}
        </>
      )}
      {selectedThread && <PostList threadId={selectedThread} />}
    </div>
  );
};

export default Forum;
