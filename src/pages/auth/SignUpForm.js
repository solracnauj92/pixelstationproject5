import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import {

  Form,

  Button,

  Image,

  Col,

  Row,

  Container,

  Alert,

} from "react-bootstrap";

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
      console.log("Submitting form with data: ", signUpData); // Log form data
      const response = await axios.post("/dj-rest-auth/registration/", signUpData);
      console.log("Response:", response); // Log response
      history.push("/signin");
      console.log("Redirecting to sign in"); // Log redirection
    } catch (err) {
      console.error("Error response:", err.response); // Log error
      setErrors(err.response?.data || {});
    }
  };

  

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
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
                aria-label="Username" // Added aria-label for accessibility
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
                aria-label="Password" // Added aria-label for accessibility
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
                aria-label="Confirm Password" // Added aria-label for accessibility
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
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729391723/gamingsignup_lfumxj.jpg"}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
