import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/GameList.module.css';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/games/');
        setGames(response.data);
      } catch (err) {
        setError('Failed to load games');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.gameList}>
      <h2>Game List</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <h3>{game.title}</h3>
            <p>Developer: {game.developer}</p>
            <p>Release Date: {game.release_date}</p>
            <p>Platform: {game.platform}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
