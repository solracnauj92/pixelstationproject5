import React from 'react';
import styles from '../../styles/GameCard.module.css';


const GameCard = ({ game, onAddToLibrary }) => {
    return (
        <div className={styles.gameCard}>
            <h3 className={styles.title}>{game.title}</h3>
            <p className={styles.description}>{game.description}</p>
            <p><strong>Genre:</strong> {game.genre}</p>
            <p><strong>Release Date:</strong> {game.releaseDate}</p>
            <button className={styles.button} onClick={() => onAddToLibrary(game.id)}>Add to Library</button>
        </div>
    );
};

export default GameCard;
