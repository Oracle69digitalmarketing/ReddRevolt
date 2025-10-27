/**
 * @file A serverless function to close ended polls.
 */

import { polls } from './pollManager.js';

export default async function closePolls() {
  const now = new Date();
  for (const poll of polls.values()) {
    if (poll.endsAt <= now) {
      // Here you would mark the poll as closed in your data store.
      console.log(`Poll "${poll.question}" has ended.`);
    }
  }
}
