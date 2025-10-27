/**
 * @file Manages the live activity feed.
 */

// In a real application, this would be a persistent data store.
const activityFeed = [];

/**
 * Adds a new event to the activity feed.
 *
 * @param {string} message The message for the event.
 */
export function addActivityFeedEvent(message) {
  const event = {
    message,
    timestamp: new Date(),
  };
  activityFeed.unshift(event); // Add to the beginning of the array

  // Keep the feed at a reasonable size
  if (activityFeed.length > 20) {
    activityFeed.pop();
  }
}

/**
 * Gets the latest activity feed events.
 *
 * @returns {object[]} The latest activity feed events.
 */
export function getActivityFeed() {
  return activityFeed;
}
