// src/pages/forum/Thread.js
import React from "react";
import { Link } from "react-router-dom";

const Thread = ({ id, title, content }) => {
  return (
    <div>
      <Link to={`/threads/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>{content}</p>
    </div>
  );
};

export default Thread;
