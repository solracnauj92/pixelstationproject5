// src/pages/forum/PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Forum.module.css';

const PostList = ({ threadId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts/?thread=${threadId}`); // Adjust the API URL as necessary
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (threadId) {
      fetchPosts();
    }
  }, [threadId]);

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

export default PostList;
