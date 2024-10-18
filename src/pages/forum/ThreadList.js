import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Forum.ThreadList.module.css';

const ThreadList = ({ forumId, onSelectThread }) => {
  const [threads, setThreads] = useState([]); // Store the list of threads

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`/forums/${forumId}/threads/`); // Fetch threads for forum
        setThreads(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (forumId) {
      fetchThreads(); // Fetch threads only if a forum is selected
    }
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
              onClick={() => onSelectThread(thread.id)} // Select thread on click
            >
              <span className={styles.threadTitle}>{thread.title}</span>
            </li>
          ))
        ) : (
          <li>No threads available.</li> // Show message if no threads found
        )}
      </ul>
    </div>
  );
};

export default ThreadList;
