// src/pages/forum/Forum.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function Forum() {
  const [forums, setForums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const currentUser = useCurrentUser();
  
  useEffect(() => {
    const fetchForums = async () => {
      try {
        const { data } = await axiosRes.get("/forums/");
        setForums(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchForums();
  }, []);

  const handleDelete = async (forumId) => {
    try {
      await axiosRes.delete(`/forums/${forumId}/`);
      setForums((prevForums) => prevForums.filter((forum) => forum.id !== forumId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Forums</h2>
      {currentUser && <button onClick={() => setShowForm(!showForm)}>New Forum</button>}
      {/* If you decide to add a form component later, uncomment the line below */}
      {/* {showForm && <ForumForm setForums={setForums} />} */}
      <ul>
        {forums.map((forum) => (
          <li key={forum.id}>
            <Link to={`/forums/${forum.id}/`}>{forum.title}</Link>
            {currentUser?.username === forum.owner && (
              <button onClick={() => handleDelete(forum.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forum;
