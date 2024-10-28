// src/pages/forum/ForumThreadPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Thread from "./Thread"; // Ensure you have a Thread component
import ThreadCreateForm from "./ThreadCreateForm"; // Create this component for new threads
import Asset from "../../components/Asset"; // For loading spinner or error messages
import styles from "../../styles/Forum.module.css"; // Optional: for styling

const ForumThreadPage = () => {
  const { forumId } = useParams(); // Changed to forumId for clarity
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true); // Set loading state to true
      setError(null); // Reset error state
      try {
        const { data } = await axiosRes.get(`/forums/${forumId}/threads/`);
        setThreads(data.results || []); // Assuming the response has a 'results' array
      } catch (err) {
        console.log(err);
        setError("Failed to load threads. Please try again later.");
      } finally {
        setLoading(false); // Set loading state to false regardless of the outcome
      }
    };
    fetchThreads();
  }, [forumId]);

  return (
    <div className={styles.ForumThreadContainer}> {/* Optional styling */}
      <h1>Forum Threads</h1>
      <ThreadCreateForm forumId={forumId} setThreads={setThreads} />
      
      {loading ? ( // Show loading spinner
        <Asset spinner />
      ) : error ? ( // Show error message if an error occurred
        <div className="text-danger">{error}</div>
      ) : (
        <div>
          {threads.length ? ( // Check if there are threads to display
            threads.map((thread) => (
              <Thread key={thread.id} {...thread} />
            ))
          ) : (
            <p>No threads available in this forum.</p> // Message if no threads exist
          )}
        </div>
      )}
    </div>
  );
};

export default ForumThreadPage;
