import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import ForumPost from './ForumPost'; // Ensure this component exists

function Thread({ thread }) {
  const [posts, setPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/forums/${thread.forum_id}/threads/${thread.id}/posts/`); // Updated endpoint
        setPosts(data.results);
      } catch (err) {
        setError("Failed to load posts."); // Set error message
        console.log(err);
      } finally {
        setHasLoaded(true);
      }
    };
    fetchPosts();
  }, [thread.id, thread.forum_id]); // Added forum_id as dependency

  if (!hasLoaded) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>; // Display error message if it exists

  return (
    <Container>
      <Row>
        <Col>
          <h4>{thread.title}</h4>
          <p>{thread.content}</p>
          <Link to={`/threads/${thread.id}/posts/new`}>
            <Button>Add Post</Button>
          </Link>
        </Col>
      </Row>
      {posts.length ? (
        posts.map((post) => <ForumPost key={post.id} post={post} />) // Use ForumPost component
      ) : (
        <p>No posts available in this thread.</p>
      )}
    </Container>
  );
}

export default Thread;
