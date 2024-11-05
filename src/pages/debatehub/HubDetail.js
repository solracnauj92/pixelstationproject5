import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row, Col, Card, Button, Form, Spinner, Image, Alert } from "react-bootstrap";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";

function HubDetail() {
  const { hubId } = useParams();
  const [hub, setHub] = useState(null);
  const [debates, setDebates] = useState({ results: [], next: null }); // Update debates to store results and next
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
        setDebates({ results: debatesData.results, next: debatesData.next }); // Update state to hold next
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
      if (!newDebateContent.trim()) {
        setError("Debate content cannot be empty.");
        return;
      }

      const { data: newDebate } = await axiosReq.post(`/debatehub/hubs/${hubId}/debates/`, {
        content: newDebateContent,
        hub: hubId
      });
      setDebates((prevDebates) => ({ results: [newDebate, ...prevDebates.results], next: prevDebates.next })); // Update the debates state
      setNewDebateContent("");
      setError(null);
    } catch (err) {
      console.error("Error creating debate:", err.response ? err.response.data : err.message);
      setError("Failed to create debate. Please try again.");
    }
  };

  // Function to load more debates
  const loadMoreDebates = async () => {
    if (debates.next) {
      try {
        const { data } = await axiosReq.get(debates.next);
        setDebates((prevDebates) => ({
          results: [...prevDebates.results, ...data.results],
          next: data.next
        }));
      } catch (err) {
        console.error("Error loading more debates:", err.response ? err.response.data : err.message);
      }
    }
  };

  return (
    <Container>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
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
          
          <h3 className="text-center font-weight-bold text-uppercase mt-5">Opinions on the Topic</h3>
          {debates.results.length ? (
            <InfiniteScroll
              dataLength={debates.results.length}
              next={loadMoreDebates}
              hasMore={!!debates.next}
              loader={<Spinner animation="border" />}
            >
              <Row>
                {debates.results.map((debate) => (
                  <Col key={debate.id} xs={12} md={12} lg={12}>
                    <Card className="m-2 shadow-lg rounded-lg p-3 transition-all duration-200 ease-in-out hover:scale-105">
                      <Row className="d-flex align-items-center">
                        <Col xs="auto" className="text-center">
                          <div className="font-weight-bold">{debate.author}</div>
                          <div className="text-muted" style={{ fontSize: '0.9em' }}>
                            {debate.created_at}
                          </div>
                        </Col>
                        <Card.Body className="p-3">
                          <Card.Text>{debate.content}</Card.Text>
                        </Card.Body>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          ) : (
            <Asset message="No debates yet. Be the first to start a debate!" />
          )}
        </>
      )}
    </Container>
  );
}

export default HubDetail;
