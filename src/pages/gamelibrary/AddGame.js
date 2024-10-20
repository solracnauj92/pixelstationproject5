import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/AddGame.module.css';

const AddGame = () => {
  const [gameId, setGameId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Log the token for debugging
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    try {
      const response = await axios.post('game_library/gamecollection/', 
        { game: gameId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response:', response.data); // Log response for debugging
      alert('Game added to your collection!');
      setGameId(''); 
    } catch (error) {
      console.error('Error adding game:', error);
      setError('Failed to add game. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h2>Add Game to Collection</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Game'}
        </button>
      </form>
    </div>
  );
};

export default AddGame;
