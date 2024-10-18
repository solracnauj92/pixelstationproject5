// src/pages/forum/Forum.js
import React, { useState } from 'react';
import ForumList from './ForumList';
import ThreadList from './ThreadList';
import PostForum from './PostForum';  // Renamed to PostForum
import ThreadCreateForm from './ThreadCreateForm';
import styles from '../../styles/Forum.module.css';

const Forum = () => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showThreadCreateForm, setShowThreadCreateForm] = useState(false);

  const handleForumSelect = (forumId) => {
    setSelectedForum(forumId);
    setSelectedThread(null);
    setShowThreadCreateForm(true);
  };

  const handleThreadSelect = (threadId) => {
    setSelectedThread(threadId);
    setShowThreadCreateForm(false); 
  };

  const handleCloseThreadCreateForm = () => {
    setShowThreadCreateForm(false); 
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
      {selectedThread && <PostForum threadId={selectedThread} />} {/* Use PostForum here */}
    </div>
  );
};

export default Forum;
