import React, { useRef, useState } from "react";
import { Form, Button, Alert, Image, Container, Row, Col, Spinner } from "react-bootstrap";
import Upload from "../../assets/upload.png"; 
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; 
import styles from "../../styles/GameCreateForm.module.css"; 
import btnStyles from "../../styles/Button.module.css";

const GameCreateForm = ({ setGames }) => {
    const imageInput = useRef(null);
    const [gameData, setGameData] = useState({
        title: "",
        description: "",
        genre: "",
        image: "",
        release_date: "", // New release_date field
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const currentUser = useCurrentUser(); 
    const { title, description, genre, image, release_date } = gameData;

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
        formData.append("release_date", release_date); // Append release_date
        formData.append("owner", currentUser?.id); 
        if (imageInput.current.files.length) {
            formData.append("image", imageInput.current.files[0]);
        }

        setLoading(true);

        try {
            const { data } = await axiosReq.post("/game_library/games/", formData);
            setGames((prevGames) => [...prevGames, data]);
            setGameData({ title: "", description: "", genre: "", image: "", release_date: "" }); // Reset state
            setSuccess(true);
        } catch (err) {
            setErrors(err.response?.data);
            setSuccess(false);
        } finally {
            setLoading(false);
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

                        <Form.Group>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="release_date"
                                value={release_date}
                                onChange={handleChange}
                                required
                            />
                            {errors?.release_date?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                        </Form.Group>

                        {/* Show loading spinner during submission */}
                        {loading ? (
                            <Spinner animation="border" />
                        ) : (
                            <Button type="submit">Create Game</Button>
                        )}

                        {/* Show success message */}
                        {success && <Alert variant="success">Game created successfully!</Alert>}
                    </Col>

                    <Col md={4}>
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <Image src={image} rounded fluid />
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} btn`} 
                                            htmlFor="image-upload"
                                        >
                                            Change the image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label htmlFor="image-upload" className="d-flex justify-content-center">
                                    <img src={Upload} alt="Upload" />
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
