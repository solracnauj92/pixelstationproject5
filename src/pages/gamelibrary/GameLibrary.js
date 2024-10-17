import React, { useEffect, useState } from 'react';
import "../../styles/GameLibrary.css";
import { getGames, getGameCollections } from '../../utils/utils'; 


const GameLibrary = () => {
    const [games, setGames] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        // Fetch the games and game collections when the component loads
        const fetchData = async () => {
            try {
                const gamesData = await getGames();
                console.log("Fetched Games Data:", gamesData); // Log the games data

                const collectionsData = await getGameCollections();
                console.log("Fetched Game Collections Data:", collectionsData); // Log the collections data

                setGames(gamesData);
                setCollections(collectionsData);
            } catch (error) {
                console.error("Error fetching data:", error); // Log any errors that occur during fetching
            }
        };

        fetchData();
    }, []);

    return (
        <div className="game-library">
            <h1>Game Library</h1>
            <div className="games-list">
                <h2>Available Games</h2>
                {games.length > 0 ? (
                    games.map(game => (
                        <div key={game.id} className="game-item">
                            <h3>{game.title}</h3>
                            <p>Developer: {game.developer}</p>
                            <p>Release Date: {new Date(game.release_date).toLocaleDateString()}</p>
                            <p>Platform: {game.platform}</p>
                        </div>
                    ))
                ) : (
                    <p>No games available</p>
                )}
            </div>

            <div className="game-collections-list">
                <h2>Your Game Collections</h2>
                {collections.length > 0 ? (
                    collections.map(collection => (
                        <div key={collection.id} className="collection-item">
                            <h3>{collection.game.title}</h3>
                            <p>Added at: {new Date(collection.added_at).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No games in your collection</p>
                )}
            </div>
        </div>
    );
};


export default GameLibrary;

