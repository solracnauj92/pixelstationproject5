import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import ForumPost from "./ForumPost";
import Asset from "../../components/Asset";

function ForumPage() {
  const { id } = useParams(); // Extract forum ID from URL
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    console.log("Forum ID:", id); // Debugging line
    const fetchPosts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const { data } = await axiosReq.get(`/forums/${id}/posts/`); // API call
        setPosts(data.results || []); // Set posts or an empty array
      } catch (err) {
        setError(err); // Set error state
        console.log(err); // Log the error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts(); // Invoke the fetch function
  }, [id]); // Dependency on forum ID

  // Render loading spinner or error message
  if (loading) return <Asset spinner />;
  if (error) return <p>Error fetching posts: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Forum Posts</h1>
      {posts.length ? (
        posts.map(post => (
          <ForumPost key={post.id} {...post} />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default ForumPage;
