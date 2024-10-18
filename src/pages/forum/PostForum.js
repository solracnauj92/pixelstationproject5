import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/ForumPost.module.css';

const PostForum = ({ forumId, threadId }) => { 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/forums/${forumId}/threads/${threadId}/posts/`);
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (threadId && forumId) { 
      fetchPosts();
    }
  }, [threadId, forumId]);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <p className={styles.postAuthor}>{post.author.username}</p>
            <p className={styles.postContent}>{post.content}</p>
            <p className={styles.datePosted}>
              <small>Posted on: {new Date(post.created_at).toLocaleString()}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostForum;
