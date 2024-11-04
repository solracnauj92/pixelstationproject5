// src/components/ForumDetail.js

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import ThreadCreateForm from "./ThreadCreateForm";

function ForumDetail() {
  const { id } = useParams();
  const [forum, setForum] = useState({});
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        const { data: forumData } = await axiosRes.get(`/forums/${id}/`);
        setForum(forumData);
        const { data: threadsData } = await axiosRes.get(`/forums/${id}/threads/`);
        setThreads(threadsData.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchForumData();
  }, [id]);

  return (
    <div>
      <h2>{forum.title}</h2>
      <ThreadCreateForm forumId={id} setThreads={setThreads} />
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ForumDetail;
