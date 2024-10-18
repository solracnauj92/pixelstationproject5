import React from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import styles from './Messaging.module.css';

const Messaging = ({ userId }) => {
  return (
    <div className={styles.messagingContainer}>
      <h1 className={styles.header}>Messaging</h1>
      <MessageForm userId={userId} />
      <MessageList userId={userId} />
    </div>
  );
};

export default Messaging;
