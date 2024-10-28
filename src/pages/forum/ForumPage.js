import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ForumThread from "./ForumThreadPage";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import styles from "../../styles/Forum.module.css";

function ForumPage() {
  const { id } = useParams();
  const [forumThread, setForumThread] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        // Fetching forum thread and its comments
        const [{ data: thread }, { data: threadComments }] = await Promise.all([
          axiosReq.get(`/forums/${id}/`),
          axiosReq.get(`/comments/?forum=${id}`),
        ]);
        setForumThread({ results: [thread] });
        setComments(threadComments);
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchForumData();
  }, [id]);

  return (
    <Row className={`h-100 ${styles.ForumPageContainer}`}>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        {/* Display the main forum thread */}
        {forumThread.results.length ? (
          <ForumThread {...forumThread.results[0]} setForumThread={setForumThread} threadPage />
        ) : (
          <Asset spinner />
        )}

        <Container>
          {/* Show comment creation form if user is logged in */}
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              forum={id}
              setForumThread={setForumThread}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            <h5>Comments</h5> // Improved user feedback when there are comments
          ) : null}

          {/* Display comments */}
          {comments.results.length ? (
            <InfiniteScroll
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            >
              {comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setForumThread={setForumThread}
                  setComments={setComments}
                />
              ))}
            </InfiniteScroll>
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ForumPage;
