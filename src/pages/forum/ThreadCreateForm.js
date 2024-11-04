// src/components/ThreadCreateForm.js

import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";

function ThreadCreateForm({ forumId, setThreads }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/threads/", { title, forum: forumId });
      setThreads((prevThreads) => [data, ...prevThreads]);
      setTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Thread Title"
        required
      />
      <button type="submit">Create Thread</button>
    </form>
  );
}

export default ThreadCreateForm;
