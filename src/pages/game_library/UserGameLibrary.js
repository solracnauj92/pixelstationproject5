import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Card } from "react-bootstrap";
import styles from '../../styles/UserGameLibrary.module.css';

const UserGameLibrary = ({ currentUser }) => {
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        const { data } = await axiosReq.get(`/game_library/user-games/?user=${currentUser.id}`);
        if (Array.isArray(data)) {
          setUserGames(data);
        } else {
          console.error("Unexpected response format:", data);
          setUserGames([]); 
        }
      } catch (err) {
        console.log(err);
        setUserGames([]); 
      }
    };

    fetchUserGames();
  }, [currentUser]);

  return (
    <Container className={styles.userGameLibrary}>
      {userGames.length === 0 ? (
        <p>No games found.</p>
      ) : (
        userGames.map((game) => (
          <Card key={game.id} className={styles.gameCard}>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>{game.title}</Card.Title>
              <Card.Text className={styles.cardText}>{game.description}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default UserGameLibrary;
