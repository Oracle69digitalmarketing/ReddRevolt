/**
 * @file A serverless function to resolve the daily game round.
 */

import { redis } from '@devvit/web/server';

export default async function resolveRound() {
  const factions = new Map(JSON.parse(await redis.get('factions')));

  let winner = null;
  let maxScore = -1;

  for (const faction of factions.values()) {
    if (faction.score > maxScore) {
      maxScore = faction.score;
      winner = faction.name;
    }
  }

  if (winner) {
    console.log(`The winner of the round is the ${winner} faction!`);
  }

  // Reset scores for the next round
  for (const faction of factions.values()) {
    faction.score = 0;
  }

  await redis.set('factions', JSON.stringify(Array.from(factions.entries())));

  // Here you would also update the leaderboard.
}
