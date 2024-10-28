import React, { useState } from "react";
import GameList from "./GameList";
import GameCreateForm from "./GameCreateForm";
import UserGameLibrary from "./UserGameLibrary";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/GameLibraryPage.module.css';

const GameLibraryPage = () => {
  const currentUser = useCurrentUser();
  const [userGames, setUserGames] = useState([]);

  return (
    <div className={styles.gameLibraryPage}>
      <h1 className={styles.title}>Your Game Library</h1>

      {/* User Game Library */}
      <UserGameLibrary currentUser={currentUser} />

      {/* Form to Create New Games */}
      <GameCreateForm setGames={setUserGames} />

      {/* List of Available Games */}
      <GameList currentUser={currentUser} setUserGames={setUserGames} />

      {/* Optional: Display User's Added Games */}
      {userGames.length > 0 ? (
        <div className={styles.userGames}>
          <h2 className={styles.userGamesTitle}>Your Added Games</h2>
          <ul className={styles.userGamesList}>
            {userGames.map(game => (
              <li key={game.id} className={styles.userGameItem}>
                {game.title}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.noGamesMessage}>No games in your library yet.</p>
      )}
    </div>
  );
};

export default GameLibraryPage;
