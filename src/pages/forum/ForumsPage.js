import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import CreateForum from "./CreateForum";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";

const ForumsPage = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchForums = async () => {
      setLoading(true);
      try {
        const { data } = await axiosReq.get(`/forums/?page=${page}`);
        setForums((prevForums) => [...prevForums, ...data.results]);

        if (data.results.length < 10) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error fetching forums:", err);
        setError("Failed to load forums.");
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, [page]);

  if (loading && page === 1) return <Asset spinner />;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div>
      <div>
        <img
          src="https://res.cloudinary.com/dvcs5hl0c/image/upload/v1730848409/gamepad_j6jhei.jpg"
          alt="Gaming Background"
          style={{ maxWidth: '100%', borderRadius: '8px' }}
        />
      </div>
      <h2 className="text-center font-weight-bold text-uppercase my-5">Forum - Monthly Quest</h2>
      <h3 className="text-center my-5">Topic of the Month: "The Music of Final Fantasy – Timeless Tunes or Just Nostalgia?" 🎶</h3>

      <p>
        Few gaming franchises have soundtracks as iconic as Final Fantasy. From Nobuo Uematsu’s original compositions in the early games
        to the sweeping orchestrations in later installments, Final Fantasy music has captivated generations of gamers. This month, let’s
        explore what makes the Final Fantasy soundtracks so special. Are they timeless masterpieces that transcend gaming, or simply beloved
        because of nostalgia?
      </p>
      <div className="bg-white p-4 my-4 rounded shadow-sm">
        <section>
          <h4 className="font-weight-bold my-5 text-center">🔍 Discussion Point: Timeless Tunes vs. Nostalgia</h4>
          <h5 className="text-center mb-5 text-center">Is the music of Final Fantasy truly timeless, or is its appeal largely due to the nostalgia it evokes?</h5>
          <div>
            <h5 className="font-weight-bold my-2">Musical Mastery or Emotional Memories?</h5>
            <p>
              Some argue that the music in Final Fantasy games, especially from composers like Nobuo Uematsu, rivals classical compositions.
              Tracks like "One-Winged Angel" (Final Fantasy VII) and "To Zanarkand" (Final Fantasy X) have even made their way into concert halls.
              But does the music stand on its own, or is it cherished because of the memories it evokes?
            </p>
          </div>
          <div>
            <h5 className="font-weight-bold my-2">Consistency in Quality Across the Series</h5>
            <p>
              How has Final Fantasy maintained a high standard of music across so many titles and composers? Each soundtrack captures a unique
              atmosphere that shapes the game’s world. Which games, in your opinion, have the most memorable soundtracks?
            </p>
          </div>
          <div>
            <h5 className="font-weight-bold my-2">Music as Storytelling</h5>
            <p>
              Final Fantasy’s music often conveys the mood and story more powerfully than visuals or dialogue. How has the music enhanced the
              storytelling of the series? Can music alone bring out emotions, or does it need the context of gameplay?
            </p>
          </div>
        </section>
      </div>
      <div className="bg-white p-4 my-4 rounded shadow-sm">
        <section>
          <h4 className="text-center font-weight-bold my-5">🎧 Further Exploration</h4>
          <div>
            <h5 className="font-weight-bold my-2">Listen</h5>
            <p>
              The album *Distant Worlds* features Final Fantasy music performed by a live orchestra. Listening outside the game may reveal
              how timeless (or nostalgic) the music truly feels.
            </p>
          </div>
          <div>
            <h5 className="font-weight-bold my-2">Game Suggestion</h5>
            <p>
              Try *Final Fantasy VI* if you haven’t – it’s widely regarded as one of Uematsu’s best works, with a soundtrack that perfectly
              complements its epic story.
            </p>
          </div>
          <div>
            <h5 className="font-weight-bold my-2">Video Resource</h5>
            <p>
              Watch *Final Fantasy: The Spirits Within*, a documentary about creating music for Final Fantasy VII, including an analysis of "One-Winged Angel."
            </p>
          </div>
        </section>
      </div>
      <h2 className="text-center font-weight-bold text-uppercase my-5">💬 Join the Discussion!</h2>
      <InfiniteScroll
        dataLength={forums.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<div>Loading more forums...</div>}
        endMessage={<p className="text-center">No more forums to load!</p>}
      >
        {forums.length > 0 ? (
          <ul>
            {forums.map((forum) => (
              <li key={forum.id}>
                <h4>{forum.name}</h4>
                <p>{forum.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No discussions available.</p>
        )}
      </InfiniteScroll>
      <CreateForum />
    </div>
  );
};

export default ForumsPage;
