import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/GameCollection.module.css';

const GameCollection = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('game_library/collections/', { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCollections(response.data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className={styles.container}> {/* Apply CSS class */}
      <h2>Your Game Collection</h2>
      {collections.length > 0 ? ( 
        <ul>
          {collections.map(collection => (
            <li key={collection.id}>
              {collection.game.title} - Added on {new Date(collection.added_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No games in your collection.</p>
      )}
    </div>
  );
};

export default GameCollection;
