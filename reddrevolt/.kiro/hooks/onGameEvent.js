/**
 * @file Kiro hook that triggers on various game events.
 */

import { checkQuests } from '../../src/server/questEngine.js';
import { vote } from '../../src/server/pollManager.js';
import { checkAchievements } from '../../src/server/achievementManager.js';

export default async function onGameEvent(event) {
  const { trigger, player, data } = event.data;

  // Handle poll votes
  if (trigger === 'poll:vote') {
    const { pollId, option } = data;
    await vote(pollId, option, player.id);
  }

  const completedQuests = await checkQuests(trigger, player);

  if (completedQuests.length > 0) {
    // Here you would update the player's completed quests in your data store
    // and give them the rewards.
    // For example:
    // const updatedQuests = [...player.completedQuests, ...completedQuests.map(q => q.id)];
    // await kiro.data.players.update(player.id, { completedQuests: updatedQuests });
    console.log(`Player ${player.name} has completed ${completedQuests.length} quests!`);
  }

  // Check for achievements
  const newlyCompletedAchievements = await checkAchievements(trigger, player);

  if (newlyCompletedAchievements.length > 0) {
    for (const achievement of newlyCompletedAchievements) {
      // Here you would update the player's completed achievements in your data store.
      // For now, we'll dispatch a custom event to the frontend.
      console.log(`Player ${player.name} completed achievement: ${achievement.name}`);
      // Dispatch a custom event to the frontend to update the UI
      // This assumes a mechanism to dispatch custom events from Kiro hooks to the frontend.
      // window.dispatchEvent(new CustomEvent('achievement-completed', { detail: { achievement } }));
    }
  }
}
