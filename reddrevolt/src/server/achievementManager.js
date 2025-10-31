import { redis } from '@devvit/web/server';

/**
 * @file Manages achievements and checks for completion.
 */

/**
 * Gets all available achievements.
 *
 * @returns {object[]} A list of all achievements.
 */
export async function getAllAchievements() {
  const achievementIds = await redis.smembers('achievements');
  const achievements = [];
  for (const id of achievementIds) {
    const achievementData = await redis.get(`achievement:${id}`);
    if (achievementData) {
      achievements.push(JSON.parse(achievementData));
    }
  }
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
