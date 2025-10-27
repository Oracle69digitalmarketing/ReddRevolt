import React, { useState, useEffect } from 'react';

/**
 * A component to display the faction leaderboard.
 * @returns {JSX.Element}
 */
export function Leaderboard() {
  const [factions, setFactions] = useState([]);

  useEffect(() => {
    async function fetchFactionScores() {
      try {
        const response = await fetch('/api/get-faction-scores');
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setFactions(data);
      } catch (error) {
        console.error('Failed to fetch faction scores:', error);
      }
    }
    fetchFactionScores();
  }, []);

  return (
    <div className="leaderboard">
      <h3>Faction Leaderboard</h3>
      <ol>
        {factions.sort((a, b) => b.score - a.score).map(faction => (
          <li key={faction.name}>
            <strong>{faction.name}:</strong> {faction.score}
          </li>
        ))}
      </ol>
    </div>
  );
}
