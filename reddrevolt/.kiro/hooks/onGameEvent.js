/**
 * @file Kiro hook that triggers on various game events.
 */

import { checkQuests } from '../../src/server/questEngine.js';
import { vote } from '../../src/server/pollManager.js';

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
}
