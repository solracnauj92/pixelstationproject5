import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults"; // Ensure this path is correct
import { Container, Row, Col, Card } from "react-bootstrap";
import Asset from "../../components/Asset"; // Component for loading and no data states
import { useParams } from "react-router-dom";

const ResponseList = () => { 
  const { debateId } = useParams(); // Use the debate ID from URL parameters
  const [responses, setResponses] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Fetch responses using useEffect
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        // Make sure the endpoint is correct for fetching responses based on the debateId
        const { data } = await axiosReq.get(`/debatehub/responses/?debate=${debateId}`);
        setResponses(data.results); // Store the results in state
        setHasLoaded(true);
      } catch (err) {
        console.error("Error fetching responses:", err);
        setHasLoaded(true); // Mark as loaded even if there is an error to show any error message
      }
    };

    fetchResponses();
  }, [debateId]); // Dependency on debateId

  return (
    <Container>
      <h1 className="text-center">Responses</h1>
      <Row>
        {hasLoaded ? (
          responses.length ? (
            responses.map((response) => (
              <Col key={response.id} xs={12} md={6} lg={4}>
                <Card className="m-2">
                  <Card.Body>
                    <Card.Title>{response.author}</Card.Title>
                    <Card.Text>{response.content}</Card.Text>
                    <Card.Text>
                      Posted At: {new Date(response.created_at).toLocaleDateString("en-US")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Asset message="No responses available." />
          )
        ) : (
          <Asset spinner />
        )}
      </Row>
    </Container>
  );
};

export default ResponseList;
