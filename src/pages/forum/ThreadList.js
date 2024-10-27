import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Forum.ThreadList.module.css';
import { getAuthToken } from '../../utils/utils'; 

const ThreadList = ({ forumId, onSelectThread }) => {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchThreads = async () => {
      const token = getAuthToken(); 
      if (!token) {
        setError('No valid token found. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(`/forums/${forumId}/threads/`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        setThreads(response.data);
        setError(null); 
      } catch (err) {
        console.error('Error fetching threads:', err.response ? err.response.data : err.message);
        setError('Failed to load threads.'); 
      }
    };

    if (forumId) fetchThreads();
  }, [forumId]);

  return (
    <div className={styles.threadList}>
      <h2>Threads</h2>
      {error && <p className={styles.error}>{error}</p>}
      <ul>
        {threads.length > 0 ? (
          threads.map((thread) => (
            <li
              key={thread.id}
              className={styles.threadItem}
              onClick={() => onSelectThread(thread.id)}
            >
              <span className={styles.threadTitle}>{thread.title}</span>
              {thread.image && (
                <img 
                  src={thread.image} 
                  alt={thread.title}  
                  className={styles.threadImage} 
                />
              )}
            </li>
          ))
        ) : (
          <li>No threads available.</li>
        )}
      </ul>
    </div>
  );
};

export default ThreadList;