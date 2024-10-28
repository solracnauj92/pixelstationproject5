import React, { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/GameList.module.css";

const GameList = ({ currentUser, setUserGames }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axiosReq.get("/game_library/games/"); 
        setGames(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGames();
  }, []);

  const handleAddGame = async (gameId) => {
    try {
      await axiosReq.post("/game_library/user-games/", { game: gameId }); 
      setUserGames((prevGames) => [...prevGames, gameId]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {games.map((game) => (
        <Card key={game.id} className={styles.GameCard}>
          <Card.Body>
            <Card.Title>{game.title}</Card.Title>
            <Card.Text>{game.description}</Card.Text>
            <Button onClick={() => handleAddGame(game.id)}>Add to Library</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default GameList;
