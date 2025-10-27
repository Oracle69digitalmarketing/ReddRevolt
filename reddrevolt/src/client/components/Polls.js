import React, { useState } from 'react';
import { getPollResults, vote } from '../../server/pollManager';

/**
 * A component to display and vote on polls.
 * @param {object} props The component props.
 * @param {object} props.poll The poll object.
 * @returns {JSX.Element}
 */
export function Polls({ poll }) {
  const [results, setResults] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async () => {
    if (selectedOption && poll) {
      // In a real app, you would get the player ID from the context.
      const playerId = 'player1'; 
      await vote(poll.id, selectedOption, playerId);
      setHasVoted(true);
      const pollResults = await getPollResults(poll.id);
      setResults(pollResults);
    }
  };

  if (!poll) {
    return <div>No active polls.</div>;
  }

  if (hasVoted && results) {
    return (
      <div className="poll-results">
        <h3>{poll.question}</h3>
        <ul>
          {Object.entries(results).map(([option, count]) => (
            <li key={option}>
              {option}: {count} votes
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="polls">
      <h3>{poll.question}</h3>
      <ul>
        {poll.options.map(option => (
          <li key={option}>
            <label>
              <input
                type="radio"
                name="poll-option"
                value={option}
                onChange={() => setSelectedOption(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleVote} disabled={!selectedOption}>Vote</button>
    </div>
  );
}
