import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../../styles/GameDetail.module.css';

const GameDetail = () => {
    const { gameId } = useParams(); 
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch game details from API
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await axios.get(`/game_library/games/${gameId}/`); 
                setGame(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [gameId]);

    if (loading) return <p>Loading game details...</p>;
    if (error) return <p>Error fetching game details: {error}</p>;

    return (
        <div className={styles.gameDetail}>
            <h2 className={styles.title}>{game.title}</h2>
            {game.image && <img className={styles.image} src={game.image} alt={game.title} />} {/* Display image if available */}
            <p className={styles.description}><strong>Description:</strong> {game.description}</p>
            <p className={styles.genre}><strong>Genre:</strong> {game.genre}</p>
            <p className={styles.releaseDate}><strong>Release Date:</strong> {game.release_date}</p>
            {/* You can add more details as needed */}
        </div>
    );
};

export default GameDetail;
