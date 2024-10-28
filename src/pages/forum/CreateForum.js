// src/pages/forums/CreateForum.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button } from "react-bootstrap";

const CreateForum = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post(`/forums/`, { title, content });
      history.push("/forums"); // Redirect to forums page after creating
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create New Forum</h2>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Create Forum</Button>
    </Form>
  );
};

export default CreateForum;
