import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

function MessageInput({ onSendMessage, selectedUser, currentUser }) {
    const [messageContent, setMessageContent] = useState("");
    const [error, setError] = useState(null); // State for error handling

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (messageContent.trim() && selectedUser) {
            try {
                const { data } = await axiosReq.post(`/messaging/messages/`, {
                    content: messageContent,
                    sender: currentUser.id,  // Use the current user's ID here
                    receiver: selectedUser,   // Specify the receiver
                });
                onSendMessage(data); // Call onSendMessage to update the message list
                setMessageContent(""); // Clear the input after sending
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error("Error sending message", err);
                setError("Failed to send message. Please try again."); // Display an error message
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message..."
                    required
                />
                <button type="submit">Send</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Error message display */}
        </div>
    );
}

export default MessageInput;
