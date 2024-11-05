import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row, Col, Card, Button, Form, Spinner, Image, Alert } from "react-bootstrap";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; 

function HubDetail() {
  const { hubId } = useParams(); 
  const [hub, setHub] = useState(null); 
  const [debates, setDebates] = useState([]); 
  const [newDebateContent, setNewDebateContent] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const currentUser = useCurrentUser(); 
  const profileImage = currentUser?.profile_image || 'path/to/default/profile/image.png';

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
        console.error("Error fetching hub details and debates:", err.response ? err.response.data : err.message);
        setError("Failed to fetch hub details and debates. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchHubAndDebates();
  }, [hubId]);

  const handleCreateDebate = async (e) => {
    e.preventDefault(); 
    try {
      const { data: newDebate } = await axiosReq.post(`/debatehub/hubs/${hubId}/debates/`, { content: newDebateContent });
      setDebates((prevDebates) => [newDebate, ...prevDebates]); 
      setNewDebateContent(""); 
      setError(null); 
    } catch (err) {
      console.error("Error creating debate:", err.response ? err.response.data : err.message);
      setError("Failed to create debate. Please try again.");
    }
  };

  return (
    <Container>
      {loading ? (
        <Spinner animation="border" /> 
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>} {/* Show error message if exists */}
          {hub && ( 
            <>
              <h1>{hub.name}</h1>
              <p>{hub.description}</p>
              <hr />
            </>
          )}

          {currentUser && ( 
            <Form onSubmit={handleCreateDebate}>
              <Form.Group controlId="debateContent">
                <Form.Label>Voice your thoughts</Form.Label>
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
                      placeholder="We want to know what you think!"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2">Submit</Button>
            </Form>
          )}

          <hr />

          <h2>Opinions on the Topic</h2>
          {debates.length ? (
            <Row>
              {debates.map((debate) => (
                <Col key={debate.id} xs={12} md={12} lg={12}> {/* Full width column */}
                  <Card className="m-2 d-flex flex-row align-items-start"> {/* Flexbox for horizontal alignment */}
                    <Col xs="auto">
                      <Image 
                        src={profileImage} alt="Profile" 
                        roundedCircle 
                        width={40} 
                        height={40} 
                        className="m-2" 
                      />
                    </Col>
                    <Card.Body>
                      <Card.Title>{debate.author.username}</Card.Title>
                      <Card.Text>{debate.content}</Card.Text> {/* Full content displayed */}
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
