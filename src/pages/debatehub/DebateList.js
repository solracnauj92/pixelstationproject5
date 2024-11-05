import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults"; // Make sure axios is correctly set up
import { Container, Row, Col, Card } from "react-bootstrap";
import Asset from "../../components/Asset"; // Component for loading and no data states
import { Link } from "react-router-dom";

const DebateList = () => {
  const [debates, setDebates] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Fetch debates on component mount
  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const { data } = await axiosReq.get("/debatehub/debates/");
        setDebates(data.results); // Store the results in state
        setHasLoaded(true);
      } catch (err) {
        console.error("Error fetching debates:", err);
      }
    };

    fetchDebates();
  }, []); // Empty dependency array ensures it only runs once

  return (
    <Container>
      <h1 className="text-center">Debates</h1>
      <Row>
        {hasLoaded ? (
          debates.length ? (
            debates.map((debate) => (
              <Col key={debate.id} xs={12} md={6} lg={4}>
                <Link to={`/debatehub/debates/${debate.id}`}>
                  <Card className="m-2">
                    <Card.Body>
                      <Card.Title>{debate.title}</Card.Title>
                      <Card.Text>Created by: {debate.creator}</Card.Text>
                      <Card.Text>
                        Created At: {new Date(debate.created_at).toLocaleDateString()}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <Asset message="No debates available." />
          )
        ) : (
          <Asset spinner />
        )}
      </Row>
    </Container>
  );
};

export default DebateList;