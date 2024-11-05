import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import ReplyCreateForm from "./ReplyCreateForm"; // Assume this is a form component for creating replies

const ThreadDetail = () => {
  const { forumId, threadId } = useParams(); // Extract forum and thread IDs from the URL
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreadData = async () => {
      try {
        // Fetch the thread details using the forumId and threadId
        const { data: threadData } = await axiosRes.get(`/forums/${forumId}/threads/${threadId}/`);
        setThread(threadData);
        
        // Fetch replies associated with the thread
        const { data: repliesData } = await axiosRes.get(`/forums/${forumId}/threads/${threadId}/replies/`);
        setReplies(repliesData.results);
      } catch (err) {
        console.error("Error fetching thread data:", err);
        setError("Failed to load thread details.");
      } finally {
        setLoading(false);
      }
    };

    fetchThreadData();
  }, [forumId, threadId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div>
      <h2>{thread.title}</h2>
      <p>{thread.content}</p>
      <h3>Replies</h3>
      <ReplyCreateForm threadId={threadId} setReplies={setReplies} />
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <p>{reply.content}</p>
            <p><strong>By:</strong> {reply.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadDetail;
