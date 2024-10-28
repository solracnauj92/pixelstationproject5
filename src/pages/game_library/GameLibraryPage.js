// GameLibraryPage.js
import React, { useState } from "react";
import GameList from "./GameList";
import GameCreateForm from "./GameCreateForm";
import UserGameLibrary from "./UserGameLibrary";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const GameLibraryPage = () => {
  const currentUser = useCurrentUser();
  const [userGames, setUserGames] = useState([]);

  return (
    <>
      <h1>Your Game Library</h1>
      <UserGameLibrary currentUser={currentUser} />
      <GameCreateForm setGames={setUserGames} />
      <GameList currentUser={currentUser} setUserGames={setUserGames} />
    </>
  );
};

export default GameLibraryPage;
