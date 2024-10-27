import React from 'react';
import { useParams } from 'react-router-dom';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Messaging = () => {
  const { receiverId } = useParams(); 
  const currentUser = useCurrentUser(); 

  return (
    <div>
      <h1>Messaging with User ID: {receiverId}</h1>
      {receiverId ? (
        <>
          <MessageForm receiverId={receiverId} onMessageSent={() => {}} />
          <MessageList receiverId={receiverId} />
        </>
      ) : (
        <p>No receiver selected.</p>
      )}
      {currentUser && <p>Current User: {currentUser.username}</p>}
    </div>
  );
};

export default Messaging;
