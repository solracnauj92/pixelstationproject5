import React from 'react';
import GameCard from './GameCard'; // Import your GameCard component
import { Row, Col } from 'react-bootstrap'; // Assuming you're using Bootstrap grid

const GameList = ({ games }) => {
    return (
        <Row>
            {games.map((game) => (
                <Col md={4} key={game.id}> {/* Adjust column size as needed */}
                    <GameCard game={game} /> {/* Pass the game object */}
                </Col>
            ))}
        </Row>
    );
};

export default GameList;
