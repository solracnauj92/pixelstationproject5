import React, { useEffect, useState } from "react";
import { Card, Button, Container, Spinner, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/GameList.module.css";

const GameList = ({ currentUser, setUserGames }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGames = async () => {
      try {
        const { data } = await axiosReq.get("/game_library/games/");
        if (isMounted) {
          setGames(data);
        }
      } catch (err) {
        console.log(err);
        if (isMounted) {
          setError("Failed to load games.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGames();

    return () => {
      isMounted = false;
    };
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
    <Container className={styles.gameListContainer}>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        games.length > 0 ? (
          games.map((game) => (
            <Card key={game.id} className={styles.gameCard}>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>{game.title}</Card.Title>
                <Card.Text className={styles.cardText}>{game.description}</Card.Text>
                <Button onClick={() => handleAddGame(game.id)} className={styles.addButton}>
                  Add to Library
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="info">No games available.</Alert>
        )
      )}
    </Container>
  );
};

export default GameList;
