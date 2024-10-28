import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults"; 
import { useCurrentUser } from "../../contexts/CurrentUserContext"; 
import Asset from "../../components/Asset"; 
import Avatar from "../../components/Avatar"; 

const Messages = () => {
    const currentUser = useCurrentUser(); 
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState(""); 
    const [users, setUsers] = useState([]); 
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true); 
    const [loadingMessages, setLoadingMessages] = useState(false); 

    // Fetch users for selection
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axiosReq.get('/profiles/');
                console.log("Fetched Users Data:", data); // Check structure of user data
                if (Array.isArray(data.results)) {
                    setUsers(data.results);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (err) {
                console.error("Failed to fetch users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Fetch messages when the component mounts or when selectedUser changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser) return; 
            setLoadingMessages(true); 
            try {
                // Adjusted to use query parameters
                const { data } = await axiosReq.get(`/messaging/messages/?user_id=${selectedUser}`);
                setMessages(data); 
            } catch (err) {
                console.error("Failed to fetch messages:", err);
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchMessages();
    }, [selectedUser]);

    const handleChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Sending message:", newMessage); // Log message being sent
        if (!newMessage.trim()) {
            setErrors({ content: "Message cannot be empty." });
            return; 
        }
        
        try {
            // Adjusted to send messages to the correct endpoint
            const { data } = await axiosReq.post(`/messaging/messages/`, { 
                content: newMessage,
                sender: currentUser.id, 
                receiver: selectedUser, // Assuming this is required for your API
            });
            setMessages((prevMessages) => [...prevMessages, data]);
            setNewMessage(""); 
            setErrors({}); 
        } catch (err) {
            console.error("Failed to send message:", err);
            setErrors(err.response?.data); 
        }
    };

    return (
        <div>
            <h2>Messages</h2>
            {loading ? (
                <Asset spinner /> 
            ) : (
                <Form.Group controlId="userSelect">
                    <Form.Label>Select User</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={selectedUser} 
                        onChange={(e) => {
                            console.log("Selected User:", e.target.value); // Log selected user
                            setSelectedUser(e.target.value);
                        }}
                    >
                        <option value="">Select a user</option>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    <Avatar src={user.image || user.profile_image} /> {user.username}
                                </option>
                            ))
                        ) : (
                            <option disabled>No users available</option>
                        )}
                    </Form.Control>
                </Form.Group>
            )}

            {errors.content && <Alert variant="danger">{errors.content}</Alert>}
            
            <ListGroup>
                {messages.map((message) => (
                    <ListGroup.Item 
                        key={message.id} 
                        style={{ backgroundColor: message.sender.id === currentUser.id ? '#d4f4dd' : '#f4f4f4' }}
                    >
                        <strong>{message.sender.username}:</strong> {message.content}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="messageInput">
                    <Form.Control
                        type="text"
                        value={newMessage}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        required
                    />
                </Form.Group>
                <Button type="submit" disabled={!selectedUser || loadingMessages}>Send</Button> 
            </Form>
        </div>
    );
};

export default Messages;
