import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Alert } from "react-bootstrap";

const ReplyCreateForm = ({ threadId, setReplies }) => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.post(`/forums/${threadId}/replies/`, { content });
      setReplies((prevReplies) => [...prevReplies, data]); // Add new reply to the list
      setContent(""); // Clear the input field
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
      console.error("Error creating reply:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Reply</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      {errors && (
        <Alert variant="danger">
          {errors.content ? errors.content : errors.general}
        </Alert>
      )}
      <Button type="submit">Post Reply</Button>
    </Form>
  );
};

export default ReplyCreateForm;
