// CreateThreadForm.js
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const CreateThreadForm = ({ forumId, setThreads }) => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.post(`/forums/${forumId}/threads/`, formData);
      setThreads((prevThreads) => ({
        results: [data, ...prevThreads.results],
      }));
      history.push(`/forums/${forumId}/threads/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={formData.content}
          onChange={handleChange}
          isInvalid={!!errors.content}
        />
        <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Create Thread</Button>
      {errors.non_field_errors && <Alert variant="danger">{errors.non_field_errors.join(", ")}</Alert>}
    </Form>
  );
};

export default CreateThreadForm;
