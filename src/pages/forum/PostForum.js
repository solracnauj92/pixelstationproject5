import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/ForumPost.module.css';

const PostForum = ({ threadId }) => {
  const [posts, setPosts] = useState([]); // Store the posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/forums/threads/${threadId}/posts/`); // Fetch posts for thread
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (threadId) {
      fetchPosts(); // Fetch posts only if a thread is selected
    }
  }, [threadId]);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <p className={styles.postAuthor}>{post.author.username}</p>
              <p className={styles.postContent}>{post.content}</p>
              <p className={styles.datePosted}>
                <small>Posted on: {new Date(post.created_at).toLocaleString()}</small>
              </p>
            </li>
          ))
        ) : (
          <li>No posts available.</li> // Show message if no posts found
        )}
      </ul>
    </div>
  );
};

export default PostForum;
