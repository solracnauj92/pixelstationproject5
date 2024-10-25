import React from 'react';
import { useParams } from 'react-router-dom';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const Messaging = () => {
  const { receiverId } = useParams(); // Get the receiverId from the URL parameters
  const currentUser = useCurrentUser(); // Get the current logged-in user

  return (
    <div>
      <h1>Messaging with User ID: {receiverId}</h1>
      {receiverId ? (
        <>
          {/* Pass the receiverId and current user to MessageForm and MessageList */}
          <MessageForm receiverId={receiverId} currentUser={currentUser} />
          <MessageList receiverId={receiverId} currentUser={currentUser} />
        </>
      ) : (
        <p>No receiver selected.</p>
      )}
      {currentUser && <p>Current User: {currentUser.username}</p>}
    </div>
  );
};

export default Messaging;
