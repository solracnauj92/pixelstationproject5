import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap"; // Import necessary components
import GameList from "./GameList"; 
import GameCreateForm from "./GameCreateForm"; // Import your create form component
import { axiosReq } from "../../api/axiosDefaults"; // Ensure you have this

const GameLibraryPage = () => {
    const [games, setGames] = useState([]); // State for storing game data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error messages

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const { data } = await axiosReq.get("/game_library/games/");
                setGames(data.results || []); // Ensure to set games data
            } catch (err) {
                console.error("Error fetching games:", err);
                setError("Failed to fetch games. Please try again."); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchGames(); // Fetch games on component mount
    }, []); // Empty dependency array to run once

    // Render loading spinner if still loading
    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" />
            <p>Loading games...</p>
        </Container>
    );

    // Render error alert if there's an error
    if (error) return (
        <Container>
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    return (
        <Container>
            <h1>All Games</h1>
            <GameList games={games} /> {/* Pass the games data to GameList */}
            <GameCreateForm setGames={setGames} /> {/* Pass the setGames function to create form */}
        </Container>
    );
};

export default GameLibraryPage;
