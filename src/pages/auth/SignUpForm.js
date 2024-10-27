import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignUpForm.module.css"; // Adjust the path if necessary
import btnStyles from "../../styles/Button.module.css"; // Adjust the path if necessary
import { Form, Button, Container, Alert, Image, Row, Col } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    if (password1 !== password2) {
      setErrors({ password2: ["Passwords do not match"] });
      return;
    }

    try {
      console.log("Submitting form with data: ", signUpData);
      const response = await axios.post("/dj-rest-auth/registration/", signUpData);
      console.log("Response:", response);
      history.push("/signin");
      console.log("Redirecting to sign in");
    } catch (err) {
      console.error("Error response:", err.response);
      setErrors(err.response?.data || {});
    }
  };

  return (
    <div className="container">
      {/* Sign Up Form Section */}
      <Container className={`${styles.contentSection} ${styles.signInContainer}`}>
        <h1 className={styles.Header}>Join the Fun!</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
              required
              aria-label="Username"
            />
          </Form.Group>
          {errors.username && errors.username.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password1">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Password"
              name="password1"
              value={password1}
              onChange={handleChange}
              required
              aria-label="Password"
            />
          </Form.Group>
          {errors.password1 && errors.password1.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password2">
            <Form.Label className="d-none">Confirm Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleChange}
              required
              aria-label="Confirm Password"
            />
          </Form.Group>
          {errors.password2 && errors.password2.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}

          <Button
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
            type="submit"
          >
            Sign Up
          </Button>

          {errors.non_field_errors && errors.non_field_errors.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>

        <Container className={`mt-3`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Container>

      {/* Testimonial Section */}
      <Container className={`${styles.contentSection} mt-3`}>
        <h3>What Our Members Say</h3>
        <Row className="text-center">
          <Col>
            <Image
              src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729361504/media/images/gamer101_u8wv4s.jpg" // Replace with actual image URLs
              roundedCircle
              className={`${styles.TestimonialImage} mb-2`}
            />
            <p><strong>Gamer101</strong></p>
            <p>"Joining Pixel Station was the best decision I made this year. The gaming community is so welcoming and diverse. Whether you’re a pro or just starting, everyone is ready to lend a hand and help you improve your skills!"</p>
          </Col>
          <Col>
            <Image
              src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729288240/media/images/amandapika_i6imxx.jpg" // Replace with actual image URLs
              roundedCircle
              className={`${styles.TestimonialImage} mb-2`}
            />
            <p><strong>AmandaPika</strong></p>
            <p>"What I love most about Pixel Station is the variety of events they host. From casual meetups to competitive tournaments, there’s always something happening. I’ve never felt so engaged and excited to be a part of a gaming community."</p>
          </Col>
          <Col>
            <Image
              src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729288144/media/images/goku_ucd4ut.jpg" // Replace with actual image URLs
              roundedCircle
              className={`${styles.TestimonialImage} mb-2`}
            />
            <p><strong>Goku</strong></p>
            <p>"The retro game library at Pixel Station is a nostalgic dream come true! I love diving into classic games from my childhood, and it's amazing to share these experiences with others who appreciate the magic of retro gaming."</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Image
              src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729288040/media/images/catboss_jyzsf0.jpg" // Replace with actual image URLs
              roundedCircle
              className={`${styles.TestimonialImage} mb-2`}
            />
            <p><strong>Catboss</strong></p>
            <p>"Pixel Station has become my go-to place to connect with fellow gamers. The community is incredibly supportive, and I've made some of my best friends here."</p>
          </Col>
          <Col>
            <Image
              src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729361248/media/images/pikapika_ai31vl.jpg" // Replace with actual image URLs
              roundedCircle
              className={`${styles.TestimonialImage} mb-2`}
            />
            <p><strong>PikaPika</strong></p>
            <p>"The atmosphere is amazing, and I love how everyone cheers each other on. It feels like a second home!"</p>
          </Col>
          <Col>
            <Image
              src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729365325/media/images/naruto_v772gp.jpg" // Replace with actual image URLs
              roundedCircle
              className={`${styles.TestimonialImage} mb-2`}
            />
            <p><strong>Naruto</strong></p>
            <p>"The variety of games available at Pixel Station is impressive! I enjoy exploring different genres and challenging myself."</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpForm;