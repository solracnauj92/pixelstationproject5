import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Spinner, Alert, Button } from 'react-bootstrap'; // Import Bootstrap components for better styling
import styles from '../../styles/GameDetail.module.css';

const GameDetail = () => {
    const { gameId } = useParams(); 
    const history = useHistory(); // To navigate back
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
                setError('Failed to fetch game details. Please try again later.'); // More user-friendly error message
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [gameId]);

    // Show loading state
    if (loading) return <Spinner animation="border" />;

    // Show error message if any
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className={styles.gameDetail}>
            <Button variant="secondary" onClick={() => history.goBack()} className={styles.backButton}>
                Go Back
            </Button>
            <h2 className={styles.title}>{game.title}</h2>
            {game.image && <img className={styles.image} src={game.image} alt={game.title} />}
            <p className={styles.description}><strong>Description:</strong> {game.description}</p>
            <p className={styles.genre}><strong>Genre:</strong> {game.genre}</p>
            <p className={styles.releaseDate}><strong>Release Date:</strong> {game.release_date}</p>
            {/* Add additional game details if available */}
            {game.developer && <p className={styles.developer}><strong>Developer:</strong> {game.developer}</p>}
            {game.publisher && <p className={styles.publisher}><strong>Publisher:</strong> {game.publisher}</p>}
            {game.platforms && <p className={styles.platforms}><strong>Platforms:</strong> {game.platforms.join(', ')}</p>}
        </div>
    );
};

export default GameDetail;
