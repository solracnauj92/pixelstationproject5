import React, { useEffect, useCallback } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const Messaging = ({ match }) => {
  const currentUser = useCurrentUser();
  const { receiverId } = match.params; // Get receiverId from route params

  const fetchMessages = useCallback(async () => {
    // Fetch logic if needed
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div>
      <h1>Messaging with User ID: {receiverId}</h1>
      {/* Pass receiverId instead of userId */}
      <MessageForm receiverId={receiverId} />
      <MessageList receiverId={receiverId} />
      {currentUser && <p>Current User: {currentUser.username}</p>}
    </div>
  );
};

export default Messaging;
