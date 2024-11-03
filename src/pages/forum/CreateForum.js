import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Alert } from "react-bootstrap";

const CreateForum = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); 
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post("/forums/", { title, content });
      setSuccessMessage("Forum created successfully!"); 
      setTimeout(() => {
        history.push("/forums");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
      console.error("Error creating forum:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create New Forum</h2>
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
      <Button type="submit">Create Forum</Button>
    </Form>
  );
};

export default CreateForum;
