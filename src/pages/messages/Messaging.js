import React, { useEffect, useCallback } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const Messaging = ({ match }) => {
  const currentUser = useCurrentUser(); // Use the current user information if needed
  const { receiverId } = match.params; // Assuming you're getting receiverId from route params

  const fetchMessages = useCallback(async () => {
    // Implement your fetch messages logic here if needed
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div>
      <h1>Messaging with User ID: {receiverId}</h1>
      <MessageForm userId={receiverId} />
      <MessageList userId={receiverId} />
      {/* You could display currentUser info if needed */}
      {currentUser && <p>Current User: {currentUser.username}</p>}
    </div>
  );
};

export default Messaging;
