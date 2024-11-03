import React from "react";
import styles from "../../styles/Forum.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Forum = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    replies_count,
    title,
    content,
    updated_at,
    forumPage,
    setForums,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/forums/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this forum?")) {
      try {
        await axiosRes.delete(`/forums/${id}/`);
        setForums((prevForums) => prevForums.filter((forum) => forum.id !== id));
        history.goBack(); 
      } catch (err) {
        console.error("Error deleting forum:", err);
      }
    }
  };

  return (
    <Card className={styles.Forum}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`} className={styles.ProfileLink}>
            <Avatar src={profile_image} height={55} />
            <span>{owner}</span>
          </Link>
          <div className="d-flex align-items-center">
            <span className={styles.UpdatedAt}>{new Date(updated_at).toLocaleString()}</span>
            {is_owner && forumPage && (
              <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/forums/${id}`}>
        <Card.Body>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{replies_count} replies</Tooltip>}
          >
            <Card.Title className="text-center">{title}</Card.Title>
          </OverlayTrigger>
          {content && <Card.Text>{content}</Card.Text>}
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Forum;
