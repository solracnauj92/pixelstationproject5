import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults"; 
import Asset from "../../components/Asset"; 
import NoResults from "../../assets/no-results.png";
import styles from "../../styles/GameCollection.module.css"; 

const GameCollection = () => {
  const [collections, setCollections] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axiosReq.get("/game_library/collections/"); 
        setCollections(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className={styles.GameCollection}>
      {hasLoaded ? (
        collections.results.length ? (
          collections.results.map((collection) => (
            <div key={collection.id}>
              {/* Display collection details here, for example: */}
              <h2>{collection.name}</h2>
              {/* Add any other collection details you want to display */}
            </div>
          ))
        ) : (
          <Asset src={NoResults} message="No collections found." />
        )
      ) : (
        <Asset spinner />
      )}
    </div>
  );
};

export default GameCollection;
