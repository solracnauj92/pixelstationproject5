import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

const ThreadCreateForm = ({ forumId, setThreads }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.post(`/forums/${forumId}/threads/`, { title, content });
      setThreads((prevThreads) => [data, ...prevThreads]); // Add new thread to the top
      setSuccessMessage("Thread created successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
      console.error("Error creating thread:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create New Thread</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errors && (
        <Alert variant="danger">
          {errors.title ? errors.title : errors.content ? errors.content : errors.general}
        </Alert>
      )}
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
      <Button type="submit">Create Thread</Button>
    </Form>
  );
};

export default ThreadCreateForm;
