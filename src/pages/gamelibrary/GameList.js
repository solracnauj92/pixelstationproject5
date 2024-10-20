import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/GameList.module.css'; 

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/game_library/games/'); 
        setGames(response.data);
      } catch (error) {
        setError('Error fetching games.');
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p>Loading games...</p>; 
  if (error) return <p>{error}</p>; 

  return (
    <div className={styles.container}>
      <h2>Game Library</h2>
      <div className={styles.gameList}>
        {games.length > 0 ? (
          games.map(game => (
            <div className={styles.gameItem} key={game.id}>
              <img src={game.image} alt={game.title} />
              <h3>{game.title}</h3>
              <p>Year: {game.release_year}</p>
              <p>Platform: {game.platform}</p>
            </div>
          ))
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </div>
  );
};

export default GameList;
