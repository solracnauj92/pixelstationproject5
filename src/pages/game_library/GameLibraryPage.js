import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll component
import GameList from "./GameList"; 
import GameCreateForm from "./GameCreateForm";
import { axiosReq } from "../../api/axiosDefaults"; 
import { fetchMoreData } from "../../utils/utils"; // Utility function to handle pagination

const GameLibraryPage = () => {
    const [games, setGames] = useState({ results: [] }); // Adjusted for pagination
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

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
        <Container>
            <h1>All Games</h1>
            {/* Add InfiniteScroll for infinite loading */}
            <InfiniteScroll
                dataLength={games.results.length} 
                next={() => fetchMoreData(games, setGames)} 
                hasMore={!!games.next} 
                loader={<Spinner animation="border" />} 
            >
                <GameList games={games.results} /> {/* Render the list of games */}
            </InfiniteScroll>
            <GameCreateForm setGames={setGames} /> {/* Form to create a new game */}
        </Container>
    );
};

export default GameLibraryPage;
