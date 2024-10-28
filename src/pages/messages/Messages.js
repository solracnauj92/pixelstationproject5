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
                const { data } = await axiosReq.get('/profiles/'); // Fetch profiles
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

    // Fetch messages based on the selected user's profile
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser) return; 
            setLoadingMessages(true); 
            try {
                const { data } = await axiosReq.get(`/profiles/${selectedUser}/messages/`); // Adjusted endpoint
                setMessages(data); // Adjust based on how your API returns messages
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
        if (!newMessage.trim()) {
            setErrors({ content: "Message cannot be empty." });
            return; 
        }
        
        try {
            const { data } = await axiosReq.post(`/profiles/${selectedUser}/messages/`, { // Adjusted endpoint
                content: newMessage,
                sender: currentUser.id, 
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
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="">Select a user</option>
                        {Array.isArray(users) && users.map((user) => (
                            <option key={user.id} value={user.id}>
                                <Avatar src={user.image || user.profile_image} /> {user.username} 
                            </option>
                        ))}
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
