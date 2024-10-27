import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Forum.ThreadList.module.css';

const ThreadList = ({ forumId, onSelectThread }) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`/forums/${forumId}/threads/`);
        setThreads(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (forumId) fetchThreads();
  }, [forumId]);

  return (
    <div className={styles.threadList}>
      <h2>Threads</h2>
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
