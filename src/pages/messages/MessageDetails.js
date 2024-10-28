// MessageDetails.js
import React from 'react';

const MessageDetails = ({ message }) => {
    if (!message) {
        return <p>No message selected</p>;
    }

    return (
        <div>
            <h2>{message.subject}</h2>
            <p>{message.content}</p>
            <p><strong>From:</strong> {message.sender.username}</p>
            <p><strong>To:</strong> {message.receiver.username}</p>
            <p><strong>Sent At:</strong> {new Date(message.created_at).toLocaleString()}</p>
        </div>
    );
};

export default MessageDetails;
