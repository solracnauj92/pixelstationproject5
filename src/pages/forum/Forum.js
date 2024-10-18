// src/pages/forum/Forum.js
import React, { useState } from 'react';
import ForumList from './ForumList';
import ThreadList from './ThreadList';
import PostList from './PostList';

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
    <div>
      <h1>Forum Page</h1>
      <ForumList onSelectForum={handleForumSelect} />
      {selectedForum && <ThreadList forumId={selectedForum} onSelectThread={handleThreadSelect} />}
      {selectedThread && <PostList threadId={selectedThread} />}
    </div>
  );
};

export default Forum;
