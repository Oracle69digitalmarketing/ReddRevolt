/**
 * @file Kiro hook that triggers when a new player joins a faction.
 */

import { Devvit } from '@devvit/public-api';
import { checkAchievements } from '../src/server/achievementManager.js';
import { addCompletedAchievement } from '../src/server/gameActions.js';

export default async function onPlayerJoin(event) {
  const { playerId, faction, player } = event.data; // Assuming player object is available in event.data

  console.log(`Player ${playerId} has joined the ${faction} faction! Sending welcome message...`);

  // Check for achievements
  const newlyCompletedAchievements = await checkAchievements("player:joinFaction", player);

  if (newlyCompletedAchievements.length > 0) {
    for (const achievement of newlyCompletedAchievements) {
      await addCompletedAchievement(player.id, achievement.id);
      console.log(`Player ${player.name} completed achievement: ${achievement.name}`);
      // Dispatch a custom event to the frontend to update the UI
      // This assumes a mechanism to dispatch custom events from Kiro hooks to the frontend.
      // window.dispatchEvent(new CustomEvent('achievement-completed', { detail: { achievement } }));
    }
  }

  // Example of sending a message (requires Devvit context and permissions):
  // await Devvit.reddit.sendPrivateMessage({
  //   to: playerId,
  //   subject: 'Welcome to ReddRevolt!',
  //   text: `Welcome to the ${faction} faction, ${playerId}! Prepare for battle!`,
  // });
}
