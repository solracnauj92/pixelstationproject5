import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Alert } from "react-bootstrap";

const CreateForum = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); 
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post("/forums/", { name, description });
      setSuccessMessage("Forum created successfully!"); 
      setTimeout(() => {
        history.push("/forums");
      }, 2000);
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
          {errors.name ? errors.name : errors.description ? errors.description : errors.general}
        </Alert>
      )}
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Create Forum</Button>
    </Form>
  );
};

export default CreateForum;
