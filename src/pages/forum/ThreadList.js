import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Forum.ThreadList.module.css';

const ThreadList = ({ forumId, onSelectThread }) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`/api/threads/?forum=${forumId}`); // Adjust the API URL as necessary
        setThreads(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (forumId) {
      fetchThreads();
    }
  }, [forumId]);

  return (
    <div className={styles.threadList}>
      <h2>Threads</h2>
      <ul>
        {threads.map((thread) => (
          <li
            key={thread.id}
            className={styles.threadItem} // Apply the thread item style
            onClick={() => onSelectThread(thread.id)}
          >
            <span className={styles.threadTitle}>{thread.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
