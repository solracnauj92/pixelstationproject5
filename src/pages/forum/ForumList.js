import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ForumList = ({ onSelectForum }) => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axios.get('/forums/');
        setForums(response.data); 
      } catch (err) {
        setError('Failed to fetch forums. Please try again later.'); 
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchForums();
  }, []);

  if (loading) {
    return <div>Loading forums...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div>
      <h2>Forums</h2>
      <ul>
        {Array.isArray(forums) && forums.length > 0 ? ( 
          forums.map((forum) => (
            <li key={forum.id} onClick={() => onSelectForum(forum.id)}>
              {forum.name}
            </li>
          ))
        ) : (
          <li>No forums available.</li> 
        )}
      </ul>
    </div>
  );
};

export default ForumList;
