import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"; // Added useHistory for redirection
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/ResponseDetail.module.css"; // Ensure this file exists for styling

const ResponseDetail = () => {
  const { id } = useParams(); // Get the response ID from the URL
  const [response, setResponse] = useState(null); // State to hold response data
  const [error, setError] = useState(null); // State to hold error message
  const currentUser = useCurrentUser(); // Get the current user
  const history = useHistory(); // For redirection after deletion

  useEffect(() => {
    const fetchResponseDetail = async () => {
      try {
        const { data } = await axiosReq.get(`/debatehub/responses/${id}/`);
        setResponse(data); // Set the response data in state
      } catch (err) {
        console.error(err);
        setError("Failed to fetch response details."); // Set error message
      }
    };

    fetchResponseDetail(); // Call the fetch function
  }, [id]); // Dependency array includes id

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this response?")) {
      try {
        await axiosReq.delete(`/debatehub/responses/${id}/`);
        history.push("/debatehub/responses"); // Redirect after deletion
      } catch (err) {
        console.error(err);
        setError("Failed to delete response."); // Set error message on failure
      }
    }
  };

  if (error) {
    return <div className={styles.Error}>{error}</div>; // Display error message
  }

  if (!response) {
    return <div>Loading...</div>; // Show loading text if response is not yet fetched
  }

  return (
    <div className={styles.ResponseDetail}>
      <h2>{response.author}</h2>
      <p>{response.content}</p>
      <span>Posted on: {new Date(response.created_at).toLocaleDateString()}</span>
      {/* Additional actions can be included here */}
      {currentUser?.username === response.author && (
        <div>
          <button onClick={() => history.push(`/debatehub/responses/${id}/edit`)}>Edit Response</button>
          <button onClick={handleDelete}>Delete Response</button>
        </div>
      )}
    </div>
  );
};

export default ResponseDetail;
