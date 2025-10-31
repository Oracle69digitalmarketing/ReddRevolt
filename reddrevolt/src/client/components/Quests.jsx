import React from 'react';

/**
 * A component to display quests.
 *
 * @param {object} props The component props.
 * @param {object[]} props.quests The list of all quests.
 * @param {string[]} props.completedQuests The list of completed quest IDs.
 * @returns {JSX.Element}
 */
export function Quests({ quests, completedQuests }) {
  return (
    <div className="quests">
      <h3>Quests</h3>
      <ul>
        {quests.map(quest => (
          <li key={quest.id} className={completedQuests.includes(quest.id) ? 'completed' : ''}>
            <strong>{quest.name}</strong>: {quest.description}
            {completedQuests.includes(quest.id) && <span> (Completed)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
