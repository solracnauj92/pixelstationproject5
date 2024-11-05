import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Asset from "../../components/Asset";

function HubDetail() {
  const { hubId } = useParams();
  const [hub, setHub] = useState(null);
  const [debates, setDebates] = useState([]);
  const [newDebateContent, setNewDebateContent] = useState("");
  const [selectedDebate, setSelectedDebate] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchHubAndDebates = async () => {
      try {
        const { data: hubData } = await axiosReq.get(`/debatehub/hubs/${hubId}/`);
        setHub(hubData);

        const { data: debatesData } = await axiosReq.get(`/debatehub/hubs/${hubId}/debates/`);
        setDebates(debatesData.results);
        setHasLoaded(true);
      } catch (err) {
        console.error("Error fetching hub details and debates:", err);
      }
    };

    fetchHubAndDebates();
  }, [hubId]);

  const handleCreateDebate = async (e) => {
    e.preventDefault();
    try {
      const { data: newDebate } = await axiosReq.post(`/debatehub/hubs/${hubId}/debates/`, {
        content: newDebateContent,
      });
      setDebates((prevDebates) => [newDebate, ...prevDebates]);
      setNewDebateContent("");  
    } catch (err) {
      console.error("Error creating debate:", err);
    }
  };

  const fetchDebateDetails = async (debateId) => {
    try {
      const { data } = await axiosReq.get(`/debatehub/debates/${debateId}/`);
      setSelectedDebate(data);
    } catch (err) {
      console.error("Error fetching debate details:", err);
    }
  };

  return (
    <Container>
      {hasLoaded ? (
        <>
          {/* Hub Details */}
          {hub && (
            <>
              <h1>{hub.name}</h1>
              <p>{hub.description}</p>
              <hr />
            </>
          )}
          
          {/* Debate Creation Form */}
          <Form onSubmit={handleCreateDebate}>
            <Form.Group controlId="debateContent">
              <Form.Label>Create a new debate</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newDebateContent}
                onChange={(e) => setNewDebateContent(e.target.value)}
                placeholder="Start a new debate here..."
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">Submit</Button>
          </Form>

          <hr />
          
          {/* Debate List */}
          <h2>Debates</h2>
          {debates.length ? (
            <Row>
              {debates.map((debate) => (
                <Col key={debate.id} xs={12} md={6} lg={4}>
                  <Card className="m-2">
                    <Card.Body>
                      <Card.Title>{debate.author}</Card.Title>
                      <Card.Text>{debate.content.slice(0, 100)}...</Card.Text>
                      <Button
                        variant="link"
                        onClick={() => fetchDebateDetails(debate.id)}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Asset message="No debates yet. Be the first to start a debate!" />
          )}

          <hr />

          {/* Selected Debate Details */}
          {selectedDebate && (
            <Card className="m-4">
              <Card.Header className="bg-primary text-white">
                <h2>{selectedDebate.hub_name}</h2>
              </Card.Header>
              <Card.Body>
                <Card.Text className="text-muted">
                  {selectedDebate.hub_description}
                </Card.Text>
                <hr />
                <h4>Debate Content</h4>
                <Card.Text>{selectedDebate.content}</Card.Text>
                <hr />
                <Card.Text className="text-muted">
                  Created by: <strong>{selectedDebate.author}</strong> on{" "}
                  {new Date(selectedDebate.created_at).toLocaleDateString()}
                </Card.Text>
                <Button variant="secondary" onClick={() => setSelectedDebate(null)}>
                  Close Details
                </Button>
              </Card.Body>
            </Card>
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}

export default HubDetail;
