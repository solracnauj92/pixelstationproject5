import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Threads</h2>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id} onClick={() => onSelectThread(thread.id)}>
            {thread.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
