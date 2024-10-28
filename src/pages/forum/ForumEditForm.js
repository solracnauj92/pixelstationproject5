import React, { useEffect, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function ForumEditForm() {
  const [errors, setErrors] = useState({});
  const [forumData, setForumData] = useState({ title: "", content: "" });
  const { title, content } = forumData;
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        const { data } = await axiosReq.get(`/forums/${id}/`);
        setForumData({ title: data.title, content: data.content });
      } catch (err) {
        console.log(err);
      }
    };
    fetchForumData();
  }, [id]);

  const handleChange = (event) => {
    setForumData({ ...forumData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.put(`/forums/${id}/`, forumData);
      history.push(`/forums/${id}`);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={title} onChange={handleChange} />
          {errors.title?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={5} name="content" value={content} onChange={handleChange} />
          {errors.content?.map((message, idx) => (
            <Alert variant="warning" key={idx}>{message}</Alert>
          ))}
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
}

export default ForumEditForm;
