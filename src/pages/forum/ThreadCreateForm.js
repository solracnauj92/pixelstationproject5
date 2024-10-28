// src/pages/forum/ThreadCreateForm.js
import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";

const ThreadCreateForm = ({ forumId, setThreads }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post(`/forums/${forumId}/threads/`, {
        title,
        content,
      });
      setThreads((prevThreads) => [data, ...prevThreads]); // Add the new thread to the list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Thread</button>
    </form>
  );
};

export default ThreadCreateForm;
