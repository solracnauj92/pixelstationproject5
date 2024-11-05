import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults"; 
import CreateForum from "./CreateForum";
import Asset from "../../components/Asset";

const ForumsPage = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const { data } = await axiosReq.get("/forums/");
        console.log("API Response:", data); 
        
        setForums(data.results || []); 
      } catch (err) {
        console.error("Error fetching forums:", err);
        setError("Failed to load forums.");
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  if (loading) return <Asset spinner />;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div>
      <h1>Available Forums</h1>
      {forums.length > 0 ? (
        <ul>
          {forums.map((forum) => (
            <li key={forum.id}>
              <Link to={`/forums/${forum.id}`}>{forum.name}</Link>
              <p>{forum.description}</p>
              <Link to={`/forums/${forum.id}/threads/`}>View Threads</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No forums available.</p>
      )}
      <CreateForum />
    </div>
  );
};

export default ForumsPage;
