import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row, Col, Card, Button, Form, Spinner, Image, Alert } from "react-bootstrap";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Import useCurrentUser

function HubDetail() {
  const { hubId } = useParams(); // Get hubId from URL parameters
  const [hub, setHub] = useState(null); // State to hold hub details
  const [debates, setDebates] = useState([]); // State to hold list of debates
  const [newDebateContent, setNewDebateContent] = useState(""); // State for new debate content
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State for error messages

  const currentUser = useCurrentUser(); // Get current user context
  const profileImage = currentUser?.profile_image; // Get profile image from currentUser

  useEffect(() => {
    const fetchHubAndDebates = async () => {
      try {
        // Fetch hub details
        const { data: hubData } = await axiosReq.get(`/debatehub/hubs/${hubId}/`);
        setHub(hubData);

        // Fetch debates for the hub
        const { data: debatesData } = await axiosReq.get(`/debatehub/hubs/${hubId}/debates/`);
        setDebates(debatesData.results);
      } catch (err) {
        // Log and set error message
        console.error("Error fetching hub details and debates:", err.response ? err.response.data : err.message);
        setError("Failed to fetch hub details and debates. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchHubAndDebates();
  }, [hubId]);

  const handleCreateDebate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Create a new debate
      const { data: newDebate } = await axiosReq.post(`/debatehub/hubs/${hubId}/debates/`, { content: newDebateContent });
      setDebates((prevDebates) => [newDebate, ...prevDebates]); // Update debates list with the new debate
      setNewDebateContent(""); // Clear the input field
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error creating debate:", err.response ? err.response.data : err.message);
      setError("Failed to create debate. Please try again.");
    }
  };

  return (
    <Container>
      {loading ? (
        <Spinner animation="border" /> // Show spinner while loading
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>} {/* Show error message if exists */}
          {hub && ( // Render hub details if available
            <>
              <h1>{hub.name}</h1>
              <p>{hub.description}</p>
              <hr />
            </>
          )}

          {currentUser && ( // Render debate creation form if the user is logged in
            <Form onSubmit={handleCreateDebate}>
              <Form.Group controlId="debateContent">
                <Form.Label>Create a new debate</Form.Label>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <Image src={profileImage} roundedCircle width={40} height={40} alt="Profile" />
                  </Col>
                  <Col>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newDebateContent}
                      onChange={(e) => setNewDebateContent(e.target.value)}
                      placeholder="Start a new debate here..."
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2">Submit</Button>
            </Form>
          )}

          <hr />

          <h2>Debates</h2>
          {debates.length ? (
            <Row>
              {debates.map((debate) => (
                <Col key={debate.id} xs={12} md={6} lg={4}>
                  <Card className="m-2">
                    <Card.Body>
                      <Card.Title>{debate.author.username}</Card.Title> {/* Assuming debate.author is an object */}
                      <Card.Text>{debate.content.slice(0, 100)}...</Card.Text>
                      <Button variant="link">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Asset message="No debates yet. Be the first to start a debate!" />
          )}
        </>
      )}
    </Container>
  );
}

export default HubDetail;
