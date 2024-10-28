import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults"; // Adjust import as necessary
import { Link } from "react-router-dom";
import CreateForum from "./CreateForum"; // Ensure this is imported
import Asset from "../../components/Asset"; // Optional: for loading spinner

const ForumsPage = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const { data } = await axiosReq.get("/forums/");
        setForums(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load forums.");
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  if (loading) return <Asset spinner />; // Optional: use a spinner for loading state
  if (error) return <div>{error}</div>; // You could enhance this with a retry button

  return (
    <div>
      <h1>Available Forums</h1>
      {forums.length > 0 ? (
        <ul>
          {forums.map((forum) => (
            <li key={forum.id}>
              <Link to={`/forums/${forum.id}`}>{forum.name}</Link>
              <p>{forum.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No forums available.</p>
      )}
      <CreateForum /> {/* Component for creating a new forum */}
    </div>
  );
};

export default ForumsPage;
