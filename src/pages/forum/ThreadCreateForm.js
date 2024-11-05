import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults"; 
import { useCurrentUser } from "../../contexts/CurrentUserContext"; 
import { Alert } from "react-bootstrap"; 

function ThreadCreateForm({ forumId, setThreads }) {
  const [title, setTitle] = useState(""); 
  const [errors, setErrors] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const currentUser = useCurrentUser(); 

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      if (!forumId) {
        throw new Error("forumId is not defined");
      }

      if (!currentUser) {
        throw new Error("User is not authenticated");
      }

      const threadData = {
        title,
        forum: forumId,
        creator: currentUser.id
      };

      console.log("Sending thread data:", threadData); 

      const { data } = await axiosRes.post(`/forums/${forumId}/threads/`, threadData);

      setThreads((prevThreads) => [data, ...prevThreads]);
      setTitle(""); 
      setSuccessMessage("Thread created successfully!"); 
      setErrors(null); 
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
        console.error("Error creating thread:", err.response.data); // Log detailed error response
      } else {
        setErrors({ general: "An unexpected error occurred." });
        console.error("Error creating thread:", err); // Log generic error
      }
      setSuccessMessage(""); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Thread Title"
          required
        />
        <button type="submit">Create Thread</button>
      </form>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      {errors && (
        <Alert variant="danger">
          {errors.title ? errors.title : errors.general}
        </Alert>
      )}
    </div>
  );
}

export default ThreadCreateForm;
