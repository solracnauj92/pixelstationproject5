import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults"; // Make sure axiosReq is correctly set up for your API
import { Container, Row, Col } from "react-bootstrap";
import Asset from "../../components/Asset";
import { Link, useParams } from "react-router-dom";

const DebateList = () => {
  const { hubId } = useParams(); // Use the hub ID from URL parameters
  const [debates, setDebates] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null); // State to hold error messages

  useEffect(() => {
    const fetchDebates = async () => {
      let isMounted = true;
      const apiUrl = `https://pixelstationproject5-api-1a9dadf46f0b.herokuapp.com/debatehub/hubs/${hubId}/debates/`;

      console.log(`Fetching debates from URL: ${apiUrl}`);

      try {
        const response = await axiosReq.get(apiUrl);
        if (isMounted) {
          setDebates(response.data.results);
          setHasLoaded(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response ? err.response.data : err.message);
          console.error("Error fetching debates:", err.response ? err.response.data : err.message);
        }
      }

      return () => {
        isMounted = false; // Cleanup function to prevent state updates on unmounted components
      };
    };

    fetchDebates();
  }, [hubId]); // Fetch when hubId changes

  return (
    <Container>
      <h1 className="text-center">Debates</h1>
      <Row>
        {error ? (
          <Col xs={12}>
            <Asset message={`Error: ${error}`} />
          </Col>
        ) : hasLoaded ? (
          debates.length ? (
            debates.map((debate) => (
              <Col key={debate.id} xs={12} className="mb-3">
                <Link to={`/debatehub/debates/${debate.id}`} className="text-decoration-none">
                  <div className="border p-3">
                    <p>{debate.content}</p>
                    <p>Created by: {debate.author?.username || "Unknown Author"}</p>
                    <p>Created At: {new Date(debate.created_at).toLocaleDateString()}</p>
                  </div>
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
