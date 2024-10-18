import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/ForumList.module.css'; // Import the CSS module

const ForumList = ({ onSelectForum }) => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axios.get('/forums/');
        setForums(response.data.results); // Access results array
      } catch (err) {
        console.error(err);
      }
    };

    fetchForums();
  }, []);

  return (
    <div>
      <h2 className={styles.forumHeading}>Forums</h2> {/* Apply styles to the heading */}
      <ul className={styles.forumList}> {/* Apply styles to the list */}
        {forums.length > 0 ? (
          forums.map((forum) => (
            <li 
              key={forum.id} 
              className={styles.forumItem} 
              onClick={() => onSelectForum(forum.id)}
            >
              {forum.name}
            </li>
          ))
        ) : (
          <li className={styles.forumItem}>No forums available.</li>
        )}
      </ul>
    </div>
  );
};

export default ForumList;
