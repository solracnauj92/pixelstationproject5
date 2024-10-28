import React, { useRef, useState } from "react";
import { Form, Button, Alert, Image, Container, Row, Col } from "react-bootstrap";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png"; 
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/GameCreateForm.module.css"; 
import btnStyles from "../../styles/Button.module.css";

const GameCreateForm = ({ setGames }) => {
  const imageInput = useRef(null);
  const [gameData, setGameData] = useState({
    title: "",
    description: "",
    genre: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const { title, description, genre, image } = gameData;

  const handleChange = (event) => {
    setGameData({
      ...gameData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image); 
      setGameData({
        ...gameData,
        image: URL.createObjectURL(event.target.files[0]), 
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre);
    if (imageInput.current.files.length) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.post("/game_library/games/", formData);
      setGames((prevGames) => [...prevGames, data]);
      setGameData({ title: "", description: "", genre: "", image: "" }); // 
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                required
              />
              {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={handleChange}
                required
              />
              {errors?.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={genre}
                onChange={handleChange}
                required
              />
              {errors?.genre?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Button type="submit">Create Game</Button>
          </Col>

          <Col md={4}>
            <Form.Group className="text-center">
              {image ? (
                <>
                  <Image src={image} rounded fluid />
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label htmlFor="image-upload" className="d-flex justify-content-center">
                  <Asset src={Upload} message="Click or tap to upload an image" />
                </Form.Label>
              )}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default GameCreateForm;
