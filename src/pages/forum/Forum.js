// src/pages/forum/Forum.js
import React, { useState } from 'react';
import ForumList from '../../components/ForumList';
import ThreadList from '../../components/ThreadList';
import PostList from '../../components/PostList';

const Forum = () => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);

  const handleForumSelect = (forumId) => {
    setSelectedForum(forumId);
    setSelectedThread(null); // Reset thread selection when changing forum
  };

  const handleThreadSelect = (threadId) => {
    setSelectedThread(threadId);
  };

  return (
    <div>
      <h1>Forum Page</h1>
      {/* Render the list of forums */}
      <ForumList onSelectForum={handleForumSelect} />

      {/* If a forum is selected, render the threads */}
      {selectedForum && <ThreadList forumId={selectedForum} onSelectThread={handleThreadSelect} />}

      {/* If a thread is selected, render the posts */}
      {selectedThread && <PostList threadId={selectedThread} />}
    </div>
  );
};

export default Forum;
