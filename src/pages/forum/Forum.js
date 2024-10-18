// src/pages/forum/Forum.js
import React, { useState } from 'react';
import ForumList from './ForumList';
import ThreadList from './ThreadList';
import PostList from './PostList';
import styles from '../../styles/Forum.module.css';

const Forum = () => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);

  const handleForumSelect = (forumId) => {
    setSelectedForum(forumId);
    setSelectedThread(null);
  };

  const handleThreadSelect = (threadId) => {
    setSelectedThread(threadId);
  };

  return (
    <div className={styles.forumContainer}> {/* Apply styles from the CSS module */}
      <h1 className={styles.forumHeading}>Forum Page</h1>
      <ForumList onSelectForum={handleForumSelect} />
      {selectedForum && <ThreadList forumId={selectedForum} onSelectThread={handleThreadSelect} />}
      {selectedThread && <PostList threadId={selectedThread} />}
    </div>
  );
};

export default Forum;
