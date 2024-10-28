import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults"; // Ensure this points to your Axios setup
import { Form, Button, Alert } from "react-bootstrap";

const CreateForum = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(null); // State for errors
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // POST request to create a new forum
      await axiosReq.post("/forums/", { title, content });
      history.push("/forums"); // Redirect to forums page after creating
    } catch (err) {
      // Set errors from the response, ensuring a fallback if undefined
      if (err.response && err.response.data) {
        setErrors(err.response.data); // Assuming the error response contains details in the data
      } else {
        setErrors({ general: "An unexpected error occurred." }); // Handle generic errors
      }
      console.error("Error creating forum:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create New Forum</h2>
      {/* Display errors if any exist */}
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
