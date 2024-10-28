// ForumCreateForm.js
import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function ForumCreateForm() {
  const [errors, setErrors] = useState({});
  const [forumData, setForumData] = useState({ title: "", content: "" });
  const { title, content } = forumData;
  const history = useHistory();
  const titleInputRef = useRef(null); 

  useEffect(() => {
    
    titleInputRef.current?.focus();
  }, []);

  const handleChange = (event) => {
    setForumData({ ...forumData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.post("/forums/", forumData);
      history.push(`/forums/${data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            name="title" 
            value={title} 
            onChange={handleChange} 
            ref={titleInputRef} 
          />
          {errors.title?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5} 
            name="content" 
            value={content} 
            onChange={handleChange} 
          />
          {errors.content?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
}

export default ForumCreateForm;
