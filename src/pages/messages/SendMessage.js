import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const SendMessage = ({ setMessages, selectedUser, currentUser }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null); // State to track errors

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!content.trim()) return; // Avoid sending empty messages

        try {
            const { data } = await axiosReq.post(`/messaging/messages/`, { // Adjusted endpoint
                content,
                sender: currentUser.id,
                receiver: selectedUser, // Include the receiver in the request body
            });
            setMessages((prevMessages) => ({
                ...prevMessages,
                results: [data, ...prevMessages.results], // Prepend the new message to the results
            }));
            setContent(""); // Clear the input after sending
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error("Error sending message", err);
            setError("Failed to send message. Please try again."); // Set error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Type your message"
                required
            />
            <button type="submit">Send</button>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        </form>
    );
};

export default SendMessage;
