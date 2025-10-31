/**
 * @file Manages polls.
 */

// This is a placeholder for where we will store the polls.
// In a real application, this would be a Kiro data store or Devvit's key-value store.
const polls = []; // Changed from Map to array

/**
 * Adds a new poll to the list.
 *
 * @param {object} poll The poll object to add.
 */
function addPoll(poll) {
  polls.push(poll);
}

/**
 * Gets all polls.
 *
 * @returns {object[]} A list of all polls.
 */
export async function getAllPolls() {
  return polls;
}

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
    votes: {}, // Changed from Map to object
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  };
  addPoll(newPoll);
  return newPoll;
}

/**
 * Gets a poll by its ID.
 *
 * @param {string} pollId The ID of the poll.
 * @returns {object | undefined} The poll object or undefined if not found.
 */
export async function getPoll(pollId) {
  return polls.find(poll => poll.id === pollId);
}


/**
 * Gets the current active poll.
 *
 * @returns {object | null} The current poll or null if there are no active polls.
 */
export async function getCurrentPoll() {
  const now = new Date();
  for (const poll of polls) {
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
  const poll = polls.find(p => p.id === pollId);
  if (poll && poll.options.includes(option)) {
    // Check if player has already voted
    for (const opt in poll.votes) {
      if (poll.votes[opt].includes(playerId)) {
        return; // Player has already voted in this poll
      }
    }

    if (!poll.votes[option]) {
      poll.votes[option] = [];
    }
    poll.votes[option].push(playerId);
  }
}

/**
 * Gets the results of a poll.
 *
 * @param {string} pollId The ID of the poll.
 * @returns {object | null} The poll results or null if the poll is not found.
 */
export async function getPollResults(pollId) {
  const poll = polls.find(p => p.id === pollId);
  if (!poll) {
    return null;
  }

  const results = {};
  for (const option of poll.options) {
    results[option] = poll.votes[option] ? poll.votes[option].length : 0;
  }
  return results;
}

/**
 * Marks a poll as closed.
 *
 * @param {string} pollId The ID of the poll to close.
 */
export async function closePoll(pollId) {
  const pollIndex = polls.findIndex(p => p.id === pollId);
  if (pollIndex !== -1) {
    polls[pollIndex].isClosed = true; // Add a flag to mark as closed
  }
}

