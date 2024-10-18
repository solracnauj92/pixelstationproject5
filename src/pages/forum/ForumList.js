// src/components/ForumList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ForumList = ({ onSelectForum }) => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axios.get('/api/forums/'); // Adjust the URL based on your backend
        setForums(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchForums();
  }, []);

  return (
    <div>
      <h2>Forums</h2>
      <ul>
        {forums.map((forum) => (
          <li key={forum.id} onClick={() => onSelectForum(forum.id)}>
            {forum.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForumList;
