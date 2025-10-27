/**
 * @file Kiro hook that triggers on karma change.
 */

import { calculateRank } from '../../src/server/rankManager.js';
import { checkQuests } from '../../src/server/questEngine.js';
import { updatePlayerRank, addCompletedQuest } from '../../src/server/gameActions.js';

export default async function onKarmaChange(event) {
  const { player } = event.data;

  // Assuming the player's karma is part of the event data.
  const newRank = await calculateRank(player.karma);

  if (newRank !== player.rank) {
    await updatePlayerRank(player.id, newRank);
    console.log(`Player ${player.name} has been promoted to ${newRank}!`);

    // Check for rank-up quests.
    const completedQuests = await checkQuests(`rank:${newRank}`, player);
    if (completedQuests.length > 0) {
        for (const quest of completedQuests) {
            await addCompletedQuest(player.id, quest.id);
            console.log(`Player ${player.name} has completed quest: ${quest.name}!`);
        }
    }
  }
}
