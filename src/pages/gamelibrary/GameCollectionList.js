import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/GameCollectionList.module.css';

const GameCollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('/collections/'); 
        setCollections(response.data);
      } catch (err) {
        setError('Failed to load collections');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.collectionList}>
      <h2>Game Collections</h2>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <p>User: {collection.user.username}</p>
            <p>Game: {collection.game.title}</p>
            <p>Added At: {new Date(collection.added_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameCollectionList;
