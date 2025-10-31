import { redis } from '@devvit/web/server';

/**
 * @file Manages quests and checks for completion.
 */

/**
 * Gets all available quests.
 *
 * @returns {object[]} A list of all quests.
 */
export async function getAllQuests() {
  const questIds = await redis.smembers('quests');
  const quests = [];
  for (const id of questIds) {
    const questData = await redis.get(`quest:${id}`);
    if (questData) {
      quests.push(JSON.parse(questData));
    }
  }
  return quests;
}

/**
 * Checks if a player has completed any quests based on a triggered event.
 *
 * @param {string} trigger The trigger event (e.g., "action:raid", "rank:Rebel").
 * @param {object} player The player object, which should include a list of completed quest IDs.
 * @returns {object[]} A list of newly completed quests.
 */
export async function checkQuests(trigger, player) {
  const newlyCompletedQuests = [];
  for (const quest of quests) {
    if (quest.trigger === trigger && !player.completedQuests.includes(quest.id)) {
      newlyCompletedQuests.push(quest);
    }
  }
  return newlyCompletedQuests;
}
