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
      <h2 className="text-center font-weight-bold text-uppercase mt-5">Reply to the Forum</h2>
      <h3 className="text-center my-4">Messages here are anonymous, allowing users to share ideas openly and without hesitation</h3>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errors && (
        <Alert variant="danger">
          {errors.name ? errors.name : errors.description ? errors.description : errors.general}
        </Alert>
      )}
      <div className="bg-white p-4 my-4 rounded shadow-sm">
        <Form.Group>
          <Form.Label><h5> Topic or Idea for Discussion</h5>
            <p>A brief title that captures the main idea or subject to be discussed</p>
          </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label><h5> Message Content or Detailed Description</h5>
            <p>A space where users can freely explore and expand on the topic, adding context or specific details to spark meaningful discussion</p></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};

export default CreateForum;
