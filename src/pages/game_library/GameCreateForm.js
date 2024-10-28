import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from '../../styles/GameCreateForm.module.css';


const GameCreateForm = ({ setGames }) => {
  const [gameData, setGameData] = useState({
    title: "",
    description: "",
    genre: "",  
    image: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setGameData({ ...gameData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      setGameData({
        ...gameData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", gameData.title);
    formData.append("description", gameData.description);
    formData.append("genre", gameData.genre);  
    if (gameData.image) {
      formData.append("image", gameData.image);
    }

    try {
      const { data } = await axiosReq.post("/game_library/games/", formData); 
      setGames((prevGames) => [...prevGames, data]);
      setGameData({ title: "", description: "", genre: "", image: "" }); 
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <Form.Group className={styles.formGroup}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={gameData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className={styles.formGroup}>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={gameData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className={styles.formGroup}>
        <Form.Label>Genre</Form.Label> {/* Added Genre input */}
        <Form.Control
          type="text"
          name="genre"
          value={gameData.genre}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className={styles.formGroup}>
        <Form.Label>Image</Form.Label>
        <Form.File onChange={handleImageChange} />
      </Form.Group>
      {errors?.title && <Alert variant="danger" className={styles.errorAlert}>{errors.title[0]}</Alert>}
      <Button type="submit" className={styles.submitButton}>Create Game</Button>
    </Form>
  );
};

export default GameCreateForm;
