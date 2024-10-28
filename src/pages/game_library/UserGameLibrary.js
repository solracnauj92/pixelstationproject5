import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Card } from "react-bootstrap";

const UserGameLibrary = ({ currentUser }) => {
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        const { data } = await axiosReq.get(`/game_library/user-games/?user=${currentUser.id}`); // Updated endpoint
        setUserGames(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserGames();
  }, [currentUser]);

  return (
    <Container>
      {userGames.map((game) => (
        <Card key={game.id}>
          <Card.Body>
            <Card.Title>{game.title}</Card.Title>
            <Card.Text>{game.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default UserGameLibrary;
