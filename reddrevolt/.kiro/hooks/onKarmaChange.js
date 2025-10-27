/**
 * @file Kiro hook that triggers on karma change.
 */

import { calculateRank } from '../../src/server/rankManager.js';
import { checkQuests } from '../../src/server/questEngine.js';

export default async function onKarmaChange(event) {
  const { player } = event.data;

  // Assuming the player's karma is part of the event data.
  const newRank = await calculateRank(player.karma);

  if (newRank !== player.rank) {
    // Here you would update the player's rank in your data store.
    // For example: await kiro.data.players.update(player.id, { rank: newRank });
    console.log(`Player ${player.name} has been promoted to ${newRank}!`);

    // Check for rank-up quests.
    const completedQuests = await checkQuests(`rank:${newRank}`, player);
    if (completedQuests.length > 0) {
        // Here you would update the player's completed quests and give them the rewards.
        console.log(`Player ${player.name} has completed ${completedQuests.length} rank-up quests!`);
    }
  }
}
