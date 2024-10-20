import React from 'react';
import { Card } from 'react-bootstrap';
import styles from '../../styles/Game.module.css'; 

const Game = ({ title, release_year, platform, image, id, handleAddToCollection }) => {
  return (
    <Card className={styles.Game}>
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Platform:</strong> {platform}<br />
          <strong>Release Year:</strong> {release_year}
        </Card.Text>
        <button onClick={() => handleAddToCollection(id)}>Add to Collection</button>
      </Card.Body>
    </Card>
  );
};

export default Game;
