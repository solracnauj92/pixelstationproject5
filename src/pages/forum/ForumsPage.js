import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults"; 
import CreateForum from "./CreateForum";
import Asset from "../../components/Asset";

const ForumsPage = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const { data } = await axiosReq.get("/forums/");
        console.log("API Response:", data); 
        
        setForums(data.results || []); 
      } catch (err) {
        console.error("Error fetching forums:", err);
        setError("Failed to load forums.");
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  if (loading) return <Asset spinner />;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div>
      <h1>Forum - Monthly Quest</h1>
      <h2>📅 Topic of the Month: "The Music of Final Fantasy – Timeless Tunes or Just Nostalgia?" 🎶</h2>
      <p>Few gaming franchises have soundtracks as iconic as Final Fantasy. From Nobuo Uematsu’s original compositions in the early games to the sweeping orchestrations in later installments, 
        Final Fantasy music has captivated generations of gamers. This month, let’s explore what makes the Final Fantasy soundtracks so special. 
        Are they timeless masterpieces that transcend gaming, or are they simply beloved because they’re nostalgic?
      </p>
      <h3>🔍 Discussion Point: Timeless Tunes vs. Nostalgia</h3>
      <p>Is the music of Final Fantasy truly timeless, or is its appeal largely due to the nostalgia it evokes? Here are some angles to consider:</p>
      <h4>Musical Mastery or Emotional Memories?</h4> <p>– Some argue that the music in Final Fantasy games, especially from composers like Nobuo Uematsu, 
        is on par with classical compositions. Tracks like "One-Winged Angel" (Final Fantasy VII) and "To Zanarkand" (Final Fantasy X) have even made their way into concert halls. 
        But does the music stand on its own, or do we love it mainly because of the memories it brings back?</p>
      <h4>Consistency in Quality Across the Series</h4> <p>– How has Final Fantasy maintained a high standard of music across so many titles and composers? 
        Each game’s soundtrack captures a unique atmosphere that shapes the game’s world, but some fans have strong feelings about which installments had the best music. 
        Which games do you think have the most memorable soundtracks?</p>
      <h4>Music as Storytelling</h4> <p>– The music in Final Fantasy often communicates the mood and story even more powerfully than the visuals or dialogue. 
        How has the music enhanced the storytelling of the series over the years? Can music alone bring out emotions, or does it need the context of gameplay?</p>
      <h3>🎧 Further Exploration:</h3>
      <h4>Listen:</h4> <p>The album Distant Worlds features Final Fantasy music performed by a live orchestra. 
        Listening to these tracks outside of the games might reveal how timeless (or tied to nostalgia) the music truly feels.</p>
        <h4>Game Suggestion:</h4> <p>Try Final Fantasy VI if you haven’t – it’s widely regarded as one of Uematsu’s best works, 
        with a soundtrack that perfectly complements its epic story.</p>
        <h4>Video Resource:</h4> <p>Check out Final Fantasy: The Spirits Within, a documentary on the making of the music for Final Fantasy VII, including an analysis of "One-Winged Angel."</p>
      <h3>💬 Join the Discussion!</h3>

      {forums.length > 0 ? (
        <ul>
          {forums.map((forum) => (
            <li key={forum.id}>
              <Link to={`/forums/${forum.id}`}>{forum.name}</Link>
              <p>{forum.description}</p>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No discussion available.</p>
      )}
      <CreateForum />
    </div>
  );
};

export default ForumsPage;
