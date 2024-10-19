import React from 'react';
import styles from '../styles/NotFound.module.css';

const NotFound = () => {
  const notFoundImageUrl = 'https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729378737/gameover_zai5jf.png'; 

  return (
    <div className={styles.container}>
      <img src={notFoundImageUrl} alt="Not Found" className={styles.image} />
      <p> Oops! You've hit a game over on this level!</p>
      <p>This page does not exist</p>
      <a href="/" className={styles.homeButton}>Return to Home</a>
    </div>
  );
};


export default NotFound;