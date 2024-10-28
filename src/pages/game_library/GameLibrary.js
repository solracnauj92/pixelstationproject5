import React from 'react';
import { Link } from 'react-router-dom';

const GameLibrary = () => {
  return (
    <div>
      <h1>Game Library</h1>
      <ul>
        <li>
          <Link to="/game_library/games">View Games</Link>
        </li>
        <li>
          <Link to="/game_library/user-games">View User Games</Link>
        </li>
      </ul>
    </div>
  );
};

export default GameLibrary;