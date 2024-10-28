import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/GameLibrary.module.css';

const GameLibrary = () => {
  return (
    <div className={styles.gameLibrary}>
      <h1 className={styles.title}>Game Library</h1>
      <ul className={styles.linkList}>
        <li className={styles.linkItem}>
          <Link to="/game_library/user-games" className={styles.link}>View Your Game Library</Link>
        </li>
      </ul>
    </div>
  );
};

export default GameLibrary;
