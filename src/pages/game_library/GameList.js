import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults"; 
import Asset from "../../components/Asset"; 
import NoResults from "../../assets/no-results.png"; 
import Game from './Game';
import styles from "../../styles/GameList.module.css"; 

const GameList = () => {
  const [games, setGames] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

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

  return (
    <div className={styles.GameList}>
      {hasLoaded ? (
        games.results.length ? (
          games.results.map((game) => (
            <Game key={game.id} {...game} />
          ))
        ) : (
          <Asset src={NoResults} message="No games found." />
        )
      ) : (
        <Asset spinner />
      )}
    </div>
  );
};

export default GameList;
