import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Forum.ThreadList.module.css';
import { getAuthToken, refreshAuthToken, isTokenExpired } from '../../utils/utils';

const ThreadList = ({ forumId, onSelectThread }) => {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreads = async () => {
      let token = getAuthToken();

      // Check if token is present and valid, refresh if needed
      if (!token || isTokenExpired(token)) {
        token = await refreshAuthToken();
        if (!token) {
          setError('Session expired. Please log in again.');
          return;
        }
      }

      console.log('Token used in request:', token);

      try {
        const response = await axios.get(
          `https://pixelstationproject5-api-1a9dadf46f0b.herokuapp.com/forums/${forumId}/threads/`,
          {
            headers: { 'Authorization': `Bearer ${token}` },
          }
        );
        setThreads(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching threads:', err.response ? err.response.data : err.message);
        if (err.response && err.response.status === 401) {
          setError('Session expired. Please log in again.');
        } else {
          setError('Failed to load threads.');
        }
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
