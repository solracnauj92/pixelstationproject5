import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import ThreadCreateForm from "./ThreadCreateForm";

const ForumThreadPage = () => {
  const { forumId, threadId } = useParams();
  const [thread, setThread] = useState({});
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchThreadData = async () => {
      try {
        const { data } = await axiosRes.get(`/forums/${forumId}/threads/${threadId}/`);
        setThread(data);
        const { data: repliesData } = await axiosRes.get(`/forums/${forumId}/threads/${threadId}/replies/`);
        setReplies(repliesData.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThreadData();
  }, [forumId, threadId]);

  return (
    <div>
      <h2>{thread.title}</h2>
      <ThreadCreateForm threadId={threadId} setReplies={setReplies} />
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>{reply.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ForumThreadPage;
