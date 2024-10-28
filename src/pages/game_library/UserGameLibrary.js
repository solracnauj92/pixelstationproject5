import React, { useEffect, useState, useCallback } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; 
import { axiosReq } from "../../api/axiosDefaults"; 
import { Container, Alert, Card } from "react-bootstrap"; 
import styles from "../../styles/UserGameLibrary.module.css"; // Ensure this import is present

const UserGameLibrary = () => {
    const currentUser = useCurrentUser();
    const [userGames, setUserGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserGames = useCallback(async () => {
        if (!currentUser) {
            setError("Current user is not defined.");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axiosReq.get(`/game_library/user-games/?user=${currentUser.id}`);
            setUserGames(data.results || []);
        } catch (err) {
            console.error("Error fetching user games:", err);
            setError("Failed to fetch games. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchUserGames();
    }, [fetchUserGames]);

    if (loading) return <p>Loading your game library...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className={styles.userGameLibrary}>
            {userGames.length === 0 ? (
                <Alert variant="info">No games found. Consider adding some!</Alert>
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
