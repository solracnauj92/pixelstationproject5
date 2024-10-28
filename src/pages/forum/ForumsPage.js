// src/pages/forums/ForumsPage.js
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq } from "../../api/axiosDefaults";
import ForumThread from "./ForumThreadPage"; 
import Asset from "../../components/Asset";
import PopularProfiles from "../profiles/PopularProfiles";
import NoResults from "../../assets/no-results.png";
import appStyles from "../../App.module.css";
import styles from "../../styles/Forum.module.css"; 
import { fetchMoreData } from "../../utils/utils";

function ForumsPage({ message, filter = "" }) {
  const [forums, setForums] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const { data } = await axiosReq.get(`/forums/?${filter}search=${query}`);
        setForums(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchForums();
    }, 1000);

    return () => clearTimeout(timer);
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        {/* Search Bar */}
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search threads"
          />
        </Form>

        {/* Button to create a new forum */}
        <Link to="/forums/create" className="btn btn-primary mb-3">
          Create New Forum
        </Link>

        {hasLoaded ? (
          <>
            {forums.results.length ? (
              <InfiniteScroll
                children={forums.results.map((forum) => (
                  <ForumThread key={forum.id} {...forum} setForums={setForums} />
                ))}
                dataLength={forums.results.length}
                loader={<Asset spinner />}
                hasMore={!!forums.next}
                next={() => fetchMoreData(forums, setForums)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ForumsPage;
