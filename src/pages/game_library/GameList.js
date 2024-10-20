import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Game from "./Game";
import Asset from "../../components/Asset";
import styles from "../../styles/GameList.module.css";

const GameList = () => {
  const [games, setGames] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [collection, setCollection] = useState([]); // Track collection

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axiosReq.get("/game_library/games/");
        setGames(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGames();
  }, []);

  const handleAddToCollection = async (gameId) => {
    try {
      const { data } = await axiosReq.post("/game_library/collections/add/", {
        game_id: gameId,
      });
      setCollection((prevCollection) => [...prevCollection, data]); // Add game to collection
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.GameList}>
      {hasLoaded ? (
        games.results.length ? (
          <>
            <h1>Games List</h1>
            {/* See My Collection Button */}
            <button onClick={() => window.location.href = "/game_library/collections"}>
              See My Collection
            </button>
  
            {games.results.map((game) => (
              <Game key={game.id} {...game} handleAddToCollection={handleAddToCollection} />
            ))}
          </>
        ) : (
          <Asset message="No games found." />
        )
      ) : (
        <Asset spinner />
      )}
    </div>
  );
};

export default GameList;
