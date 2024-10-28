// SendMessage.js
import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const SendMessage = ({ setMessages, selectedUser, currentUser }) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!content.trim()) return; // Avoid sending empty messages

        try {
            const { data } = await axiosReq.post(`/messaging/messages/${selectedUser}/`, {
                content,
                sender: currentUser.id,
            });
            setMessages((prevMessages) => ({
                ...prevMessages,
                results: [data, ...prevMessages.results], // Prepend the new message to the results
            }));
            setContent(""); // Clear the input after sending
        } catch (err) {
            console.error("Error sending message", err);
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
        </form>
    );
};

export default SendMessage;
