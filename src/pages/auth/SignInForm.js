import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

function SignInForm() {
    const setCurrentUser = useSetCurrentUser();
    useRedirect("loggedIn");

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInData;

    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/dj-rest-auth/login/", signInData);
            console.log("Login response:", response.data); // Log the entire response to verify structure

            // Update to match the response keys (access_token and refresh_token)
            const { access_token, refresh_token, user } = response.data;

            if (!access_token || !refresh_token) {
                throw new Error("Missing tokens in response");
            }

            // Store the tokens in local storage
            localStorage.setItem("token", access_token); // Store the access token
            localStorage.setItem("refresh_token", refresh_token); // Store the refresh token

            // Set the current user if available in response
            setCurrentUser(user);

            // Redirect or navigate as necessary
            history.goBack();
        } catch (err) {
            console.error("Error during login:", err); // Log error details
            setErrors(err.response?.data || { non_field_errors: ['An error occurred during login.'] }); // Handle errors gracefully
        }
    };

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="container">
            {/* Sign In Form Section */}
            <Container className={`${styles.contentSection} ${styles.signInContainer}`}>
                <h1 className={styles.Header}>Welcome back!</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label className="d-none">Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            className={styles.Input}
                            value={username}
                            onChange={handleChange}
                            aria-label="Username"
                        />
                    </Form.Group>
                    {errors.username?.map((message, idx) => (
                        <Alert key={idx} variant="warning">
                            {message}
                        </Alert>
                    ))}

                    <Form.Group controlId="password">
                        <Form.Label className="d-none">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            className={styles.Input}
                            value={password}
                            onChange={handleChange}
                            aria-label="Password"
                        />
                    </Form.Group>
                    {errors.password?.map((message, idx) => (
                        <Alert key={idx} variant="warning">
                            {message}
                        </Alert>
                    ))}
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                        type="submit"
                    >
                        Sign in
                    </Button>
                    {errors.non_field_errors?.map((message, idx) => (
                        <Alert key={idx} variant="warning" className="mt-3">
                            {message}
                        </Alert>
                    ))}
                </Form>
                <Link className={styles.Link} to="/signup">
                    Don't have an account? <span>Sign up now!</span>
                </Link>
            </Container>

            {/* Background Image Section */}
            <div className={styles.imageContainer}>
                <img src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729817950/familygaming_fgct2j.jpg" alt="Gaming Background" style={{ maxWidth: '100%', borderRadius: '8px' }} />
            </div>
        </div>
    );
}

export default SignInForm;
