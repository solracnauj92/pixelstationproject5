import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import ForumPost from "./ForumPost";
import Asset from "../../components/Asset";

function ForumPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosReq.get(`/forums/${id}/posts/`);
        setPosts(data.results || []);
      } catch (err) {
        setError("Error fetching posts: " + (err.response?.data?.detail || err.message));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  if (loading) return <Asset spinner />;
  if (error) return <p className="text-danger">{error}</p>;

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
