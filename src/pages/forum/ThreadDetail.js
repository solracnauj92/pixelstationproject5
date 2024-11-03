import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Thread = ({ id, title, content }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        <Link to={`/threads/${id}`}>Read more</Link>
      </Card.Body>
    </Card>
  );
};

export default Thread;
