import React from 'react';

/**
 * A component to display achievements.
 *
 * @param {object} props The component props.
 * @param {object[]} props.achievements The list of all achievements.
 * @param {string[]} props.completedAchievements The list of completed achievement IDs.
 * @returns {JSX.Element}
 */
export function Achievements({ achievements, completedAchievements }) {
  return (
    <div className="achievements">
      <h3>Achievements</h3>
      <ul>
        {achievements.map(achievement => (
          <li key={achievement.id} className={completedAchievements.includes(achievement.id) ? 'completed' : ''}>
            <strong>{achievement.name}</strong>: {achievement.description}
            {completedAchievements.includes(achievement.id) && <span> (Completed)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
