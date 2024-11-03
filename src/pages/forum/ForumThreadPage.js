import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Thread from "./ThreadDetail"; // Ensure you have a Thread component
import ThreadCreateForm from "./ThreadCreateForm"; // Create this component for new threads
import Asset from "../../components/Asset";

const ForumThreadPage = () => {
  const { forumId } = useParams();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const { data } = await axiosRes.get(`/forums/${forumId}/threads/`);
        setThreads(data.results || []);
      } catch (err) {
        setError("Error fetching threads: " + (err.response?.data?.detail || err.message));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, [forumId]);

  if (loading) return <Asset spinner />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h1>Forum Threads</h1>
      <ThreadCreateForm forumId={forumId} setThreads={setThreads} />
      {threads.length ? (
        threads.map(thread => (
          <Thread key={thread.id} {...thread} />
        ))
      ) : (
        <p>No threads available.</p>
      )}
    </div>
  );
};

export default ForumThreadPage;
