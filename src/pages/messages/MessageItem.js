import React, { useState } from "react";

function MessageInput({ onSendMessage }) {
    const [messageContent, setMessageContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageContent.trim()) {
            onSendMessage(messageContent);
            setMessageContent("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
}

export default MessageInput;
