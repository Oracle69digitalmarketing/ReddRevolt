/**
 * @file Manages player ranks based on karma.
 */

// In a real application, you would fetch this from your Kiro data store.
const ranks = [
  { name: "Recruit", minKarma: 0 },
  { name: "Rebel", minKarma: 500 },
  { name: "Warlord", minKarma: 1000 },
];

/**
 * Calculates a player's rank based on their karma score.
 *
 * @param {number} karma The player's karma score.
 * @returns {string} The player's rank.
 */
export function calculateRank(karma) {
  let playerRank = "Recruit";
  for (const rank of ranks) {
    if (karma >= rank.minKarma) {
      playerRank = rank.name;
    }
  }
  return playerRank;
}
