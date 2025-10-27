/**
 * @file Manages quests and checks for completion.
 */

// In a real application, you would fetch this from your Kiro data store.
const quests = [
  {
    id: "firstRaid",
    name: "First Strike",
    description: "Successfully complete your first raid.",
    trigger: "action:raid",
    reward: "100 Energy",
  },
  {
    id: "communityVoice",
    name: "Community Voice",
    description: "Vote in a poll.",
    trigger: "poll:vote",
    reward: "50 Energy",
  },
  {
    id: "rankUp",
    name: "Climbing the Ranks",
    description: "Achieve the rank of Rebel.",
    trigger: "rank:Rebel",
    reward: "200 Energy",
  }
];

/**
 * Gets all available quests.
 *
 * @returns {object[]} A list of all quests.
 */
export async function getAllQuests() {
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
