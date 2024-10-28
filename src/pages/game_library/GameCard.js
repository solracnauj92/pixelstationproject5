import React from 'react';
import { Card } from 'react-bootstrap';
import styles from '../../styles/GameCard.module.css';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <Card className={styles.GameCard}>
            <Link to={`/games/${game.id}`}>
                <Card.Img src={game.image} alt={game.title} />
            </Link>
            <Card.Body>
                <h3 className={styles.title}>{game.title}</h3>
                <p className={styles.description}>{game.description}</p>
                <p className={styles.genre}>Genre: {game.genre}</p>
                {/* Display the release date if it is available */}
                {game.release_date ? (
                    <p className={styles.releaseDate}>
                        Release Date: {new Date(game.release_date).toLocaleDateString()}
                    </p>
                ) : (
                    <p className={styles.releaseDate}>Release Date: Not Available</p>
                )}
            </Card.Body>
        </Card>
    );
};

export default GameCard;
