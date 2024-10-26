import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {

  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className={styles.Input}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
          className={styles.Input}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <div className="d-flex justify-content-between">

        <Button

          className={`${btnStyles.Button} ${btnStyles.Blue}`}

          onClick={() => history.goBack()}

        >

          Cancel

        </Button>

        <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">

          Create

        </Button>

      </div>
    </div>
  );

  return (
    <Container className={`${styles.contentSection} ${styles.Container}`}>

      <Form onSubmit={handleSubmit}>

        <Row>

          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>

            <div className={styles.imageContainer}>

              <Form.Group className="text-center">

                {image ? (

                  <>

                    <figure>

                      <Image className={appStyles.Image} src={image} rounded />

                    </figure>

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

                  <Form.Label

                    className="d-flex justify-content-center"

                    htmlFor="image-upload"

                  >

                    <Asset

                      src={Upload}

                      message="Click or tap to upload an image"

                    />

                  </Form.Label>

                )}

                <Form.File

                  id="image-upload"

                  accept="image/*"

                  onChange={handleChangeImage}

                  ref={imageInput}

                />

              </Form.Group>

              {errors?.image?.map((message, idx) => (

                <Alert variant="warning" key={idx}>

                  {message}

                </Alert>

              ))}

              <div className="d-md-none">{textFields}</div>

            </div>

          </Col>

          <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">

            <Container className={styles.contentSection}>

              {textFields}

            </Container>

          </Col>

        </Row>

      </Form>



      {/* Background Image Section */}

      <div className={styles.imageContainer}>

        <img

          src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1729902048/share_u5b05a.jpg"

          alt="Gaming Background"

          style={{ maxWidth: '100%', borderRadius: '8px' }}

        />

      </div>

    </Container>
  );
}

export default PostCreateForm;