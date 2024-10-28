import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import GameCard from './GameCard';
import styles from '../../styles/GameCollection.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const GameCollection = () => {
    const currentUser = useCurrentUser(); // Get the current user
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGames = useCallback(async () => {
        const token = localStorage.getItem("token");

        if (!currentUser || !token) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`/game_library/user-games/?user=${currentUser.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Fetched Games:", response.data); // Debugging line

            if (Array.isArray(response.data.results)) {
                setGames(response.data.results);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (err) {
            console.error("Fetch Error:", err); // Debugging line
            setError(err.response?.data?.non_field_errors || 'Error fetching games.');
        } finally {
            setLoading(false);
        }
    }, [currentUser]); // Include currentUser as a dependency

    useEffect(() => {
        fetchGames(); // Fetch games on component mount or when currentUser changes
    }, [fetchGames]); // Depend on fetchGames

    const handleAddToLibrary = async (gameId) => {
        const token = localStorage.getItem("token");
        if (!currentUser || !token) {
            setError("User not logged in. Cannot add games.");
            return;
        }

        try {
            await axios.post('/game_library/user-games/', { game: gameId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(`Game with ID ${gameId} added to library!`);
            await fetchGames(); // Refresh game list after adding
        } catch (error) {
            console.error("Error adding game to library", error);
            setError("Error adding game to library. Please try again.");
        }
    };

    if (loading) return <p>Loading games...</p>;
    if (error) return <p>Error fetching games: {error}</p>;

    return (
        <div className={styles.gameCollection}>
            <h2 className={styles.heading}>Game Library</h2>
            <div className={styles.gameList}>
                {games.length === 0 ? (
                    <p>Your Game Library: No games found.</p>
                ) : (
                    games.map(game => (
                        <GameCard 
                            key={game.id} 
                            game={game} 
                            onAddToLibrary={handleAddToLibrary} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default GameCollection;
