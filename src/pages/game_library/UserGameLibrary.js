import React, { useEffect, useState, useCallback } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Alert, Card, Spinner } from "react-bootstrap";
import styles from "../../styles/UserGameLibrary.module.css"; // Ensure this import is present

const UserGameLibrary = () => {
    const currentUser = useCurrentUser();
    const [userGames, setUserGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserGames = useCallback(async () => {
        // Check if currentUser is defined
        if (!currentUser) {
            setError("Current user is not defined.");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axiosReq.get(`/game_library/user-games/`);
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

    // Show loading state
    if (loading) return <Spinner animation="border" />;

    // Show error message if any
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
