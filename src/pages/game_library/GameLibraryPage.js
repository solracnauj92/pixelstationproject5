import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll component
import GameList from "./GameList";
import GameCreateForm from "./GameCreateForm";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/GameLibraryPage.module.css"; // Importing your CSS module

const GameLibraryPage = () => {
    const [games, setGames] = useState({ results: [] }); // Adjusted for pagination
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch initial games
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const { data } = await axiosReq.get("/game_library/games/");
                setGames(data); // Save the full data object to support pagination
            } catch (err) {
                console.error("Error fetching games:", err);
                setError("Failed to fetch games. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    // Function to handle adding a new game
    const handleAddGame = async (newGame) => {
        // Refresh the games list by re-fetching
        await fetchGames();
    };

    // Fetch more data for infinite scroll
    const fetchMoreData = async () => {
        if (!games.next) return; // Early return if there's no next page

        try {
            const { data } = await axiosReq.get(games.next);
            setGames((prevGames) => ({
                ...data,
                results: [...prevGames.results, ...data.results],
            }));
        } catch (err) {
            console.error("Error fetching more games:", err);
            setError("Failed to load more games. Please try again.");
        }
    };

    // Function to refresh the game list
    const fetchGames = async () => {
        try {
            const { data } = await axiosReq.get("/game_library/games/");
            setGames(data); // Save the full data object to support pagination
        } catch (err) {
            console.error("Error fetching games:", err);
            setError("Failed to fetch games. Please try again.");
        }
    };

    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" />
            <p>Loading games...</p>
        </Container>
    );

    if (error) return (
        <Container>
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    return (
        <Container className={styles.noHorizontalScroll}> {/* Apply CSS module for no scroll */}
            <h2 className="text-center font-weight-bold text-uppercase my-5">Add games to library</h2>
            <GameCreateForm setGames={handleAddGame} /> {/* Pass handler to form */}

            {/* Add InfiniteScroll for infinite loading */}
            <InfiniteScroll
                dataLength={games.results.length}
                next={fetchMoreData} // Fetch more data when scrolled to bottom
                hasMore={!!games.next}
                loader={<Spinner animation="border" />}
            >
                <h2 className="text-center font-weight-bold text-uppercase my-5">Game Library</h2>
                <GameList games={games.results} /> {/* Render the list of games */}
            </InfiniteScroll>
        </Container>
    );
};

export default GameLibraryPage;
