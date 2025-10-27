import React, { useState, useEffect } from 'react';

/**
 * A component to display the live activity feed.
 * @returns {JSX.Element}
 */
export function ActivityFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function fetchActivityFeed() {
      try {
        const response = await fetch('/api/get-activity-feed');
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setFeed(data);
      } catch (error) {
        console.error('Failed to fetch activity feed:', error);
      }
    }

    const interval = setInterval(fetchActivityFeed, 5000); // Fetch every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="activity-feed">
      <h3>Live Activity</h3>
      <ul>
        {feed.map((event, index) => (
          <li key={index}>
            {new Date(event.timestamp).toLocaleTimeString()}: {event.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
