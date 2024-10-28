// src/pages/forum/ForumThreadPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Thread from "./Thread"; // Assume you have a Thread component
import ThreadCreateForm from "./ThreadCreateForm"; // Create this component for new threads

const ForumThreadPage = () => {
  const { forumId } = useParams();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const { data } = await axiosRes.get(`/forums/${forumId}/threads/`);
        setThreads(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThreads();
  }, [forumId]);

  return (
    <div>
      <h1>Forum Threads</h1>
      <ThreadCreateForm forumId={forumId} setThreads={setThreads} />
      <div>
        {threads.map((thread) => (
          <Thread key={thread.id} {...thread} />
        ))}
      </div>
    </div>
  );
};

export default ForumThreadPage;
