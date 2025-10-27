/**
 * @file Serverless function to close ended polls.
 */

import { getAllPolls, getPollResults, closePoll } from './pollManager.js';

export default async function closePolls() {
  console.log('Running closePolls function...');
  const now = new Date();

  const allPolls = await getAllPolls();
  for (const poll of allPolls) {
    if (!poll.isClosed && new Date(poll.endsAt) <= now) {
      const results = await getPollResults(poll.id);
      console.log(`Poll "${poll.question}" has ended. Results:`, results);
      await closePoll(poll.id);
      console.log(`Poll "${poll.question}" has been closed.`);
      // Here you would add logic to distribute rewards, update game state, etc.
    }
  }
  console.log('Finished running closePolls function.');
}