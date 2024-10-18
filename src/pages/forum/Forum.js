import React, { useState } from 'react';
import ForumList from './ForumList';
import ThreadList from './ThreadList';
import PostForum from './PostForum'; 
import ThreadCreateForm from './ThreadCreateForm';
import styles from '../../styles/Forum.module.css';

const Forum = () => {
  const [selectedForum, setSelectedForum] = useState(null); // Store selected forum
  const [selectedThread, setSelectedThread] = useState(null); // Store selected thread
  const [showThreadCreateForm, setShowThreadCreateForm] = useState(false); 

  const handleForumSelect = (forumId) => {
    setSelectedForum(forumId);  // Set selected forum
    setSelectedThread(null);    // Reset selected thread
    setShowThreadCreateForm(true);
  };

  const handleThreadSelect = (threadId) => {
    setSelectedThread(threadId);  // Set selected thread when clicked
    setShowThreadCreateForm(false); 
  };

  const handleCloseThreadCreateForm = () => {
    setShowThreadCreateForm(false); 
  };

  return (
    <div className={styles.forumContainer}>
      <h1 className={styles.forumHeading}>Forum Page</h1>
      
      {/* Render Forum List */}
      <ForumList onSelectForum={handleForumSelect} />
      
      {selectedForum && (
        <>
          {/* Render ThreadList only when a forum is selected */}
          <ThreadList forumId={selectedForum} onSelectThread={handleThreadSelect} />
          
          {showThreadCreateForm && (
            <div className={styles.threadCreateForm}>
              <ThreadCreateForm forumId={selectedForum} onClose={handleCloseThreadCreateForm} />
            </div>
          )}
        </>
      )}
      
      {/* Render PostForum only when a thread is selected */}
      {selectedThread && <PostForum threadId={selectedThread} />}
    </div>
  );
};

export default Forum;
