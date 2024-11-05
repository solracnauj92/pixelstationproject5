import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults"; // Adjust the import path as needed
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Context to get the current user
import CreateForum from './CreateForum'; // Component to create new forum

function Forum() {
  const [forums, setForums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const currentUser = useCurrentUser(); // Get the current user from context

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const { data } = await axiosRes.get("/forums/"); // Fetch forums from API
        setForums(data.results); // Set fetched forums in state
      } catch (err) {
        console.log(err); // Log errors if any
      }
    };
    fetchForums(); // Call the fetch function
  }, []);

  const handleDelete = async (forumId) => {
    try {
      await axiosRes.delete(`/forums/${forumId}/`); // Delete the forum with the given ID
      setForums((prevForums) => prevForums.filter((forum) => forum.id !== forumId)); // Update state to remove deleted forum
    } catch (err) {
      console.log(err); // Log errors if any
    }
  };

  return (
    <div>
      <h2>Forums</h2>
      {currentUser && <button onClick={() => setShowForm(!showForm)}>New Forum</button>}
      {showForm && <CreateForum setForums={setForums} />} {/* Pass setForums to CreateForum */}
      <ul>
        {forums.map((forum) => (
          <li key={forum.id}>
            <Link to={`/forums/${forum.id}/`}>{forum.name}</Link> {/* Updated from title to name */}
            {currentUser?.username === forum.owner && (
              <button onClick={() => handleDelete(forum.id)}>Delete</button> // Allow forum owner to delete
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forum;
