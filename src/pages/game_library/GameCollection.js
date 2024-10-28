import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap"; // Keep Button if used
import GameCard from "./GameCard"; // Ensure this path is correct
import styles from "../../styles/GameCollection.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Correct path for importing
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq } from "../../api/axiosDefaults";

const GameCollection = () => {
    const currentUser = useCurrentUser(); // Get the current user from context
    console.log("Current User:", currentUser); // Log the current user for debugging
    const [games, setGames] = useState({ results: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPage, setNextPage] = useState(null); // For pagination

    const fetchGames = useCallback(async () => {
        if (!currentUser) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        try {
            const response = await axiosReq.get(`/game_library/user-games/?user=${currentUser.id}`);
            setGames(response.data);
            setNextPage(response.data.next); // Save the next page URL for pagination
        } catch (err) {
            console.error("Fetch Error:", err);
            setError(err.message || "Error fetching games.");
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    // Load more games for pagination
    const fetchMoreGames = async () => {
        if (nextPage) {
            try {
                setLoading(true); // Set loading true while fetching more games
                const response = await axiosReq.get(nextPage);
                setGames((prevGames) => ({
                    ...response.data,
                    results: [...prevGames.results, ...response.data.results],
                }));
                setNextPage(response.data.next); // Update nextPage
            } catch (err) {
                console.error("Fetch More Error:", err);
                setError(err.message || "Error fetching more games.");
            } finally {
                setLoading(false); // Reset loading status
            }
        }
    };

    if (loading && games.results.length === 0) return <Spinner animation="border" />;
    if (error) return <div>{error}</div>;

    return (
        <Container className={styles.gameCollection}>
            <h1>Your Game Collection</h1>
            {games.results.length === 0 ? (
                <div className={styles.noResults}>
                    <img src={NoResults} alt="No results found" />
                    <p>No games found in your collection.</p>
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={games.results.length}
                    next={fetchMoreGames}
                    hasMore={!!nextPage}
                    loader={loading ? <Spinner animation="border" /> : null} // Show loader when fetching more games
                >
                    <Row>
                        {games.results.map((game) => (
                            <Col key={game.id} md={4} className="mb-3">
                                <GameCard game={game} />
                            </Col>
                        ))}
                    </Row>
                </InfiniteScroll>
            )}
            <Button variant="primary" onClick={fetchGames}>Refresh Games</Button> {/* Example Button */}
        </Container>
    );
};

export default GameCollection;
