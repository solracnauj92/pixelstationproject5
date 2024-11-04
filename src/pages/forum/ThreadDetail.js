// src/components/ThreadDetail.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import ReplyCreateForm from "../replies/ReplyCreateForm";
import Reply from "../replies/Reply";

function ThreadDetail() {
  const { id } = useParams();
  const [thread, setThread] = useState({});
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchThreadData = async () => {
      try {
        const { data: threadData } = await axiosRes.get(`/threads/${id}/`);
        setThread(threadData);
        const { data: repliesData } = await axiosRes.get(`/threads/${id}/replies/`);
        setReplies(repliesData.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThreadData();
  }, [id]);

  return (
    <div>
      <h2>{thread.title}</h2>
      <ReplyCreateForm threadId={id} setReplies={setReplies} />
      <ul>
        {replies.map((reply) => (
          <Reply key={reply.id} {...reply} setReplies={setReplies} />
        ))}
      </ul>
    </div>
  );
}

export default ThreadDetail;
