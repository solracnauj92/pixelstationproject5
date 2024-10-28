// src/pages/forum/ForumPost.js
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForumPost = ({ post, setPosts }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        <Link to={`/forum/${post.id}`}>Read more</Link>
      </Card.Body>
    </Card>
  );
};

export default ForumPost;
