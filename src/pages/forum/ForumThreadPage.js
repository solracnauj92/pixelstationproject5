import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Thread from "./ThreadDetail"; 
import ThreadCreateForm from "./ThreadCreateForm"; 
import Asset from "../../components/Asset";
import Reply from "../replies/Reply"; 
import ReplyCreateForm from "../replies/ReplyCreateForm"; 
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const ForumThreadPage = () => {
  const { forumId } = useParams();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replies, setReplies] = useState({ results: [] }); 
  const [currentThreadId, setCurrentThreadId] = useState(null); 
  const [loadingReplies, setLoadingReplies] = useState(false);  // New state for replies loading
  
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const { data } = await axiosRes.get(`/forums/${forumId}/threads/`);
        setThreads(data.results || []);
      } catch (err) {
        setError("Error fetching threads: " + (err.response?.data?.detail || err.message));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, [forumId]);

  const handleReplies = async (threadId) => {
    setCurrentThreadId(threadId);
    setLoadingReplies(true);  // Set loading for replies
    try {
      const { data } = await axiosRes.get(`/replies/?thread=${threadId}`);
      setReplies(data);
    } catch (err) {
      setError("Error fetching replies: " + (err.response?.data?.detail || err.message));
      console.error(err);
    } finally {
      setLoadingReplies(false);  // Reset loading for replies
    }
  };

  if (loading) return <Asset spinner />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h1>Forum Threads</h1>
      <ThreadCreateForm forumId={forumId} setThreads={setThreads} />
      {threads.length ? (
        threads.map(thread => (
          <div key={thread.id}>
            <Thread {...thread} handleReplies={handleReplies} />
            {/* Display replies for the selected thread */}
            {currentThreadId === thread.id && (
              <div>
                {loadingReplies ? (  // Display loading spinner for replies
                  <Asset spinner />
                ) : (
                  <>
                    {currentUser && (
                      <ReplyCreateForm
                        profile_id={currentUser.profile_id}
                        profileImage={profile_image}
                        thread={thread.id}
                        setReplies={setReplies}
                      />
                    )}
                    {replies.results.length ? (
                      <InfiniteScroll
                        children={replies.results.map(reply => (
                          <Reply key={reply.id} {...reply} />
                        ))}
                        dataLength={replies.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!replies.next}
                        next={() => fetchMoreData(replies, setReplies)}
                      />
                    ) : currentUser ? (
                      <span>No replies yet, be the first to reply!</span>
                    ) : (
                      <span>No replies... yet</span>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No threads available.</p>
      )}
    </div>
  );
};

export default ForumThreadPage;
