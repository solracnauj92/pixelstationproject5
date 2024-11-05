// src/pages/debatehub/DebateDetail.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults"; // Ensure axios is set up
import { Container, Card, Button } from "react-bootstrap";
import Asset from "../../components/Asset"; // Component for loading and no data states

const DebateDetail = () => {
  const { id } = useParams(); // Get the debate ID from the URL
  const [debate, setDebate] = useState(null); // State to hold the debate details
  const [hasLoaded, setHasLoaded] = useState(false); // State to manage loading

  // Fetch debate details on component mount
  useEffect(() => {
    const fetchDebate = async () => {
      try {
        const { data } = await axiosReq.get(`/debatehub/debates/${id}/`); // Fetch debate details
        setDebate(data); // Set debate state
        setHasLoaded(true); // Mark as loaded
      } catch (err) {
        console.error("Error fetching debate:", err);
      }
    };

    fetchDebate();
  }, [id]); // Run effect when debate ID changes

  return (
    <Container>
      {hasLoaded ? (
        debate ? (
          <Card className="my-4">
            <Card.Body>
              <Card.Title>{debate.title}</Card.Title>
              <Card.Text>Created by: {debate.creator}</Card.Text>
              <Card.Text>Hub ID: {debate.hub}</Card.Text>
              <Card.Text>
                Created At: {new Date(debate.created_at).toLocaleDateString()}
              </Card.Text>
              <Button variant="primary" href={`/debatehub/debates/${debate.id}/edit`}>
                Edit Debate
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Asset message="Debate not found." />
        )
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default DebateDetail;
