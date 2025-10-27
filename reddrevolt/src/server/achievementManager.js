/**
 * @file Manages achievements and checks for completion.
 */

// In a real application, you would fetch this from your Kiro data store.
const achievements = [
  {
    id: "firstFactionJoin",
    name: "First Step",
    description: "Join a faction for the first time.",
    trigger: "player:joinFaction",
    reward: "100 Energy",
  },
  {
    id: "firstRaid",
    name: "First Strike",
    description: "Successfully complete your first raid.",
    trigger: "action:raid",
    reward: "50 Energy",
  },
  {
    id: "masterDefender",
    name: "Master Defender",
    description: "Successfully defend your faction 10 times.",
    trigger: "action:defend:10", // Example: trigger with count
    reward: "200 Energy",
  }
];

/**
 * Gets all available achievements.
 *
 * @returns {object[]} A list of all achievements.
 */
export async function getAllAchievements() {
  return achievements;
}

/**
 * Checks if a player has completed any achievements based on a triggered event.
 *
 * @param {string} trigger The trigger event (e.g., "player:joinFaction", "action:raid").
 * @param {object} player The player object, which should include a list of completed achievement IDs.
 * @returns {object[]} A list of newly completed achievements.
 */
export async function checkAchievements(trigger, player) {
  const newlyCompletedAchievements = [];
  for (const achievement of achievements) {
    if (achievement.trigger === trigger && !player.completedAchievements.includes(achievement.id)) {
      newlyCompletedAchievements.push(achievement);
    }
  }
  return newlyCompletedAchievements;
}
