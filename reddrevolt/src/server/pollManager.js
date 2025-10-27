/**
 * @file Manages polls.
 */

import { Devvit } from '@devvit/public-api';

// This is a placeholder for where we will store the polls.
// In a real application, this would be a Kiro data store or Devvit's key-value store.
const polls = new Map();

/**
 * Creates a new poll.
 *
 * @param {string} question The poll question.
 * @param {string[]} options The poll options.
 * @returns {object} The created poll.
 */
export async function createPoll(question, options) {
  const pollId = `poll:${Date.now()}`;
  const newPoll = {
    id: pollId,
    question,
    options,
    votes: new Map(),
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  };
  polls.set(pollId, newPoll);
  return newPoll;
}

/**
 * Gets a poll by its ID.
 *
 * @param {string} pollId The ID of the poll.
 * @returns {object | undefined} The poll object or undefined if not found.
 */
export async function getPoll(pollId) {
  return polls.get(pollId);
}


/**
 * Gets the current active poll.
 *
 * @returns {object | null} The current poll or null if there are no active polls.
 */
export async function getCurrentPoll() {
  const now = new Date();
  for (const poll of polls.values()) {
    if (poll.endsAt > now) {
      return poll;
    }
  }
  return null;
}

/**
 * Registers a vote on a poll.
 *
 * @param {string} pollId The ID of the poll.
 * @param {string} option The option to vote for.
 * @param {string} playerId The ID of the player voting.
 */
export async function vote(pollId, option, playerId) {
  const poll = polls.get(pollId);
  if (poll && poll.options.includes(option)) {
    for (const [opt, voters] of poll.votes.entries()) {
        if (voters.includes(playerId)) {
            // Player has already voted in this poll
            return;
        }
    }

    if (!poll.votes.has(option)) {
      poll.votes.set(option, []);
    }
    poll.votes.get(option).push(playerId);
  }
}

/**
 * Gets the results of a poll.
 *
 * @param {string} pollId The ID of the poll.
 * @returns {object | null} The poll results or null if the poll is not found.
 */
export async function getPollResults(pollId) {
  const poll = polls.get(pollId);
  if (!poll) {
    return null;
  }

  const results = {};
  for (const option of poll.options) {
    results[option] = poll.votes.has(option) ? poll.votes.get(option).length : 0;
  }
  return results;
}
