import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import styles from "../../styles/GameCollection.module.css";

const GameCollection = () => {
  const [collection, setCollection] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const { data } = await axiosReq.get("/game_library/collections/");
        setCollection(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCollection();
  }, []);

  return (
    <div className={styles.GameCollection}>
      {hasLoaded ? (
        collection.results.length ? (
          <>
            <h1>My Collection</h1>
            {collection.results.map((game) => (
              <div key={game.id}>
                <h2>{game.title}</h2>
                {/* Additional game info here */}
              </div>
            ))}
          </>
        ) : (
          <Asset src={NoResults} message="No games in your collection." />
        )
      ) : (
        <Asset spinner />
      )}
    </div>
  );
};

export default GameCollection;
