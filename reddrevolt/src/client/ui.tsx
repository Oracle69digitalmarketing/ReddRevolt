import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RankDisplay } from './components/RankDisplay';
import { Polls } from './components/Polls';
import { ActivityFeed } from './components/ActivityFeed';

const UI = () => {
  const [rank, setRank] = useState({ name: 'Recruit', iconUrl: 'https://www.redditstatic.com/gold/awards/icon/gold_64.png' });
  const [count, setCount] = useState(0);
  const [poll, setPoll] = useState(null);
  const [quests, setQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);

  const [faction, setFaction] = useState(null);

  const [energy, setEnergy] = useState(100); // Initial energy

  useEffect(() => {
    async function fetchQuests() {
        const allQuests = await getAllQuests();
        setQuests(allQuests);
    }
    fetchQuests();
  }, []);

  useEffect(() => {
    const handleCountChanged = (event: CustomEvent) => {
      setCount(event.detail.count);
    };

    const handleRankChanged = (event: CustomEvent) => {
      setRank(event.detail.rank);
    };

    const handleNewPoll = (event: CustomEvent) => {
      setPoll(event.detail.poll);
    };

    const handleQuestCompleted = (event: CustomEvent) => {
      setCompletedQuests(prevCompletedQuests => [...prevCompletedQuests, event.detail.quest.id]);
    };

    const handleEnergyChanged = (event: CustomEvent) => {
        setEnergy(event.detail.energy);
    };

    window.addEventListener('count-changed', handleCountChanged);
    window.addEventListener('rank-changed', handleRankChanged);
    window.addEventListener('new-poll', handleNewPoll);
    window.addEventListener('quest-completed', handleQuestCompleted);
    window.addEventListener('energy-changed', handleEnergyChanged);

    return () => {
      window.removeEventListener('count-changed', handleCountChanged);
      window.removeEventListener('rank-changed', handleRankChanged);
      window.removeEventListener('new-poll', handleNewPoll);
      window.removeEventListener('quest-completed', handleQuestCompleted);
      window.removeEventListener('energy-changed', handleEnergyChanged);
    };
  }, []);

  const handleJoinFaction = (factionName: string) => {
    const event = new CustomEvent('join-faction', { detail: { faction: factionName } });
    window.dispatchEvent(event);
    setFaction(factionName); // Optimistically update the UI
  };

  const handleRaid = () => {
    const event = new CustomEvent('raid-action', { detail: { cost: 10 } });
    window.dispatchEvent(event);
  };

  const handleDefend = () => {
    const event = new CustomEvent('defend-action', { detail: { cost: 5 } });
    window.dispatchEvent(event);
  };

  const handleInfluence = () => {
    const event = new CustomEvent('influence-action', { detail: { cost: 20 } });
    window.dispatchEvent(event);
  };

  if (!faction) {
    return (
      <div className="ui-overlay">
        <div className="ui-header">
            <h1>Choose your Faction</h1>
        </div>
        <div className="ui-main">
            <button onClick={() => handleJoinFaction('Red')}>Join Red Faction</button>
            <button onClick={() => handleJoinFaction('Blue')}>Join Blue Faction</button>
            <button onClick={() => handleJoinFaction('Green')}>Join Green Faction</button>
        </div>
      </div>
    );
  }

  return (
    <div className="ui-overlay">
        <div className="ui-header">
            <h1>ReddRevolt</h1>
            <p>Faction: {faction}</p>
        </div>
        <div className="ui-main">
            <div className="ui-sidebar">
                <h2>Player Stats</h2>
                <p>Energy: {energy}</p>
                <RankDisplay rank={rank} />
                <hr />
                <h2>Actions</h2>
                <button onClick={handleRaid}>Raid (Cost: 10 Energy)</button>
                <button onClick={handleDefend}>Defend (Cost: 5 Energy)</button>
                <button onClick={handleInfluence}>Influence (Cost: 20 Energy)</button>
                <hr />
                <Leaderboard />
            </div>
            <div className="ui-content">
                <ActivityFeed />
                <hr />
                <Polls poll={poll} />
                <hr />
                <Quests quests={quests} completedQuests={completedQuests} />
            </div>
        </div>
    </div>
  );
};

const container = document.getElementById('ui-container');
if (container) {
  const root = createRoot(container);
  root.render(<UI />);
}
