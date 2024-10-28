import React, { useEffect, useState, useCallback } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Card } from "react-bootstrap";
import styles from '../../styles/UserGameLibrary.module.css';
import jwt_decode from "jwt-decode";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Ensure this import is correct

const UserGameLibrary = () => {
    const currentUser = useCurrentUser(); // Use the hook to get the current user
    const [userGames, setUserGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isTokenExpired = (token) => {
        if (!token) return true; // No token means expired
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // in seconds
        return decodedToken.exp < currentTime;
    };

    const fetchUserGames = useCallback(async () => {
        if (!currentUser) {
            console.warn("Current user is not defined.");
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("token");
        if (isTokenExpired(token)) {
            console.warn("Token is expired. Please log in again.");
            setError("Token expired. Please log in again.");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axiosReq.get(`/game_library/user-games/?user=${currentUser.id}`);
            if (data.results && Array.isArray(data.results)) {
                setUserGames(data.results);
            } else {
                console.error("Unexpected response format:", data);
                setUserGames([]);
            }
        } catch (err) {
            console.error("Error fetching user games:", err.response || err.message);
            setError("Failed to fetch games. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            fetchUserGames();
        } else {
            setLoading(false); // Stop loading if there's no user
        }
    }, [fetchUserGames, currentUser]); // Fetch user games when currentUser changes

    if (loading) return <p>Loading your game library...</p>;
    if (error) return <p>Error: {error}</p>;

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
