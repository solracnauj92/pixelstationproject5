// src/pages/game_library/GameCollection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from './GameCard';

const GameCollection = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch games from API
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('/game_library/games/'); 
                setGames(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const handleAddToLibrary = async (gameId) => {
        // Logic to add the game to the user's library
        try {
            await axios.post('/game_library/user-games/', { game: gameId }); 
            console.log(`Game with ID ${gameId} added to library!`);
        } catch (error) {
            console.error("Error adding game to library", error);
        }
    };

    if (loading) return <p>Loading games...</p>;
    if (error) return <p>Error fetching games: {error}</p>;

    return (
        <div className="game-collection">
            <h2>Game Collection</h2>
            <div className="game-list">
                {games.map(game => (
                    <GameCard 
                        key={game.id} 
                        game={game} 
                        onAddToLibrary={handleAddToLibrary} 
                    />
                ))}
            </div>
        </div>
    );
};

export default GameCollection;
