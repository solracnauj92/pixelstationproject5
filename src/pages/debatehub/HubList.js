import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row, Col, Card } from "react-bootstrap";
import Asset from "../../components/Asset";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../styles/HubList.module.css";

function HubList() {
  const [hubs, setHubs] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [next, setNext] = useState(null); // State for tracking next URL

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const { data } = await axiosReq.get("/debatehub/hubs/");
        setHubs(data.results);
        setNext(data.next); // Set next URL
        setHasLoaded(true);
      } catch (err) {
        console.error("Error fetching hubs:", err);
      }
    };

    fetchHubs();
  }, []);

  // Function to load more hubs
  const loadMoreHubs = async () => {
    if (next) {
      try {
        const { data } = await axiosReq.get(next);
        setHubs((prevHubs) => [...prevHubs, ...data.results]); // Append new hubs
        setNext(data.next); // Update the next URL
      } catch (err) {
        console.error("Error loading more hubs:", err);
      }
    }
  };

  return (
    <Container>
      {/* Background Image Section */}
      <div className={styles.imageContainer}>
        <img
          src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1730848409/gamepad_j6jhei.jpg"
          alt="Gaming Background"
          style={{ maxWidth: '100%', borderRadius: '8px' }}
        />
      </div>

      <h2 className="text-center font-weight-bold text-uppercase mt-5">Debate Hub</h2>
      <h5 className="text-center my-5">Debate Hub is a space where passionate individuals come together to discuss and share their thoughts on various topics.
        Each "room" represents a unique debate, and inside, you can join others in exchanging opinions, debating different viewpoints, and expanding your knowledge.
        <br>
        </br>
        <br></br>Click on any of the hubs below to enter a conversation and start sharing your insights. Whether you agree, disagree, or simply want to learn more, your voice matters here!</h5>
      <InfiniteScroll
        dataLength={hubs.length} // Length of the hub array
        next={loadMoreHubs} // Function to call for loading more
        hasMore={!!next} // Check if there's more to load
        loader={<Asset spinner />} // Loader to show while loading
      >
        <Row>
          {hasLoaded ? (
            hubs.length ? (
              hubs.map((hub) => (
                <Col key={hub.id} xs={12} md={6} lg={4} className="mb-4"> {/* Add margin-bottom for space between rows */}
                  <Link to={`/debatehub/hubs/${hub.id}/`}>
                    <Card className={`${styles.hubCard} m-2`}>
                      <Card.Body>
                        <Card.Title>{hub.name}</Card.Title>
                        <Card.Text>{hub.description}</Card.Text>
                        <Card.Text>
                          Created At: {new Date(hub.created_at).toLocaleDateString()}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <Asset message="No hubs available." />
            )
          ) : (
            <Asset spinner />
          )}
        </Row>
      </InfiniteScroll>
    </Container>
  );
}

export default HubList;
