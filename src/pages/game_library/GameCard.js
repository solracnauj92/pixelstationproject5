// src/pages/game_library/GameCard.js

import React from 'react';

const GameCard = ({ game, onAddToLibrary }) => {
    return (
        <div className="game-card">
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <p><strong>Genre:</strong> {game.genre}</p>
            <p><strong>Release Date:</strong> {game.releaseDate}</p>
            <button onClick={() => onAddToLibrary(game.id)}>Add to Library</button>
        </div>
    );
};

export default GameCard;
