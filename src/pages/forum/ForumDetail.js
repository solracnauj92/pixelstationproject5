import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults"; 
import Asset from "../../components/Asset";

const ForumDetail = () => {
  const { id } = useParams(); 
  const [forum, setForum] = useState(null);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForumDetail = async () => {
      try {
        
        const { data } = await axiosReq.get(`/forums/${id}/`);
        setForum(data);

        
        const threadsResponse = await axiosReq.get(`/forums/${id}/threads/`);
        setThreads(threadsResponse.data.results);
      } catch (err) {
        console.error("Error fetching forum detail:", err);
        setError("Failed to load forum details.");
      } finally {
        setLoading(false);
      }
    };

    fetchForumDetail();
  }, [id]);

  if (loading) return <Asset spinner />;
  if (error) return <div className="text-danger">{error}</div>;
  if (!forum) return <p>No forum found.</p>; 

  return (
    <div>
      <h1>{forum.name}</h1>
      <p>{forum.description}</p>
      <p>Created on: {forum.created_at}</p>
      
      <h2>Threads</h2>
      {threads.length > 0 ? (
        <ul>
          {threads.map((thread) => (
            <li key={thread.id}>
              <Link to={`/forums/${forum.id}/threads/${thread.id}`}>{thread.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No threads available in this forum.</p>
      )}
    </div>
  );
};

export default ForumDetail;