import React from 'react';

/**
 * A component to display a player's rank.
 *
 * @param {object} props The component props.
 * @param {object} props.rank The player's rank object.
 * @param {string} props.rank.name The name of the rank.
 * @param {string} props.rank.iconUrl The URL of the rank's icon.
 * @returns {JSX.Element}
 */
export function RankDisplay({ rank }) {
  if (!rank) {
    return null;
  }

  return (
    <div className="rank-display">
      <img src={rank.iconUrl} alt={rank.name} className="rank-icon" />
      <span className="rank-name">{rank.name}</span>
    </div>
  );
}
