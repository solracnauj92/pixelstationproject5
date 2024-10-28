// MessageList.js
import React from 'react';

const MessageList = ({ messages, onSelectMessage }) => {
    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.map((message) => (
                    <li key={message.id} onClick={() => onSelectMessage(message)}>
                        <strong>{message.subject}</strong>: {message.content}
                        <br />
                        (From: {message.sender.username}, To: {message.receiver.username})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
