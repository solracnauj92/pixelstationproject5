import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/GameLibrary.module.css';

const GameLibrary = () => {
  const [games, setGames] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/games/');
        setGames(response.data);
      } catch (err) {
        console.error('Error fetching games:', err);
      }
    };

    const fetchCollections = async () => {
      try {
        const response = await axios.get('/collections/');
        setCollections(response.data);
      } catch (err) {
        console.error('Error fetching collections:', err);
      }
    };

    fetchGames();
    fetchCollections();
  }, []);

  return (
    <div className={styles.collectionList}>
      <h2>Your Game Library</h2>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <p><strong>Game:</strong> {collection.game.title}</p>
            <p><strong>Developer:</strong> {collection.game.developer}</p>
            <p><strong>Added On:</strong> {new Date(collection.added_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      <h2>All Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <p><strong>Title:</strong> {game.title}</p>
            <p><strong>Developer:</strong> {game.developer}</p>
            <p><strong>Release Date:</strong> {new Date(game.release_date).toLocaleDateString()}</p>
            <p><strong>Platform:</strong> {game.platform}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameLibrary;
