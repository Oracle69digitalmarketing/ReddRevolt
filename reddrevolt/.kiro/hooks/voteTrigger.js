/**
 * @file Kiro hook that triggers on upvote.
 */

import { redis } from '@devvit/web/server';

export default async function voteTrigger(event) {
  // Assuming the event is a VOTE event and contains the author's name and the post ID.
  const { post, author } = event;

  // In a real application, you would have a way to map the author name to a player ID.
  // For now, we'll assume the author name is the player ID.
  const playerId = author.name;

  const players = new Map(JSON.parse(await redis.get('players')));
  const player = players.get(playerId);

  if (player) {
    player.energy += 10; // Grant 10 energy for an upvote
    await redis.set('players', JSON.stringify(Array.from(players.entries())));
    console.log(`Player ${playerId} received 10 energy for upvoting.`);
  }
}
