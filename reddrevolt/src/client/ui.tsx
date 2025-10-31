import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RankDisplay } from './components/RankDisplay.jsx';
import { Polls } from './components/Polls.jsx';
import { ActivityFeed } from './components/ActivityFeed.jsx';
import { Achievements } from './components/Achievements.jsx';
import { Leaderboard } from './components/Leaderboard.jsx';
import { Quests } from './components/Quests.jsx';

const UI = () => {
  const [rank, setRank] = useState({ name: 'Recruit', iconUrl: 'https://www.redditstatic.com/gold/awards/icon/gold_64.png' });
  const [count, setCount] = useState(0);
  const [poll, setPoll] = useState(null);
  const [quests, setQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [completedAchievements, setCompletedAchievements] = useState([]);
  const [faction, setFaction] = useState(null);
  const [energy, setEnergy] = useState(100); // Initial energy
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const questsResponse = await fetch('/api/quests');
        const questsData = await questsResponse.json();
        setQuests(questsData);

        const achievementsResponse = await fetch('/api/achievements');
        const achievementsData = await achievementsResponse.json();
        setAchievements(achievementsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
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

    const handleAchievementCompleted = (event: CustomEvent) => {
        setCompletedAchievements(prevCompletedAchievements => [...prevCompletedAchievements, event.detail.achievement.id]);
    };

    window.addEventListener('count-changed', handleCountChanged);
    window.addEventListener('rank-changed', handleRankChanged);
    window.addEventListener('new-poll', handleNewPoll);
    window.addEventListener('quest-completed', handleQuestCompleted);
    window.addEventListener('energy-changed', handleEnergyChanged);
    window.addEventListener('achievement-completed', handleAchievementCompleted);

    return () => {
      window.removeEventListener('count-changed', handleCountChanged);
      window.removeEventListener('rank-changed', handleRankChanged);
      window.removeEventListener('new-poll', handleNewPoll);
      window.removeEventListener('quest-completed', handleQuestCompleted);
      window.removeEventListener('energy-changed', handleEnergyChanged);
      window.removeEventListener('achievement-completed', handleAchievementCompleted);
    };
  }, []);

  const handleJoinFaction = (factionName: string) => {
    const event = new CustomEvent('join-faction', { detail: { faction: factionName } });
    window.dispatchEvent(event);
    setFaction(factionName); // Optimistically update the UI
    window.dispatchEvent(new CustomEvent('start-game'));
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
    <div className={`ui-overlay ${faction ? `faction-${faction}` : ''} ${isNightMode ? 'night-mode' : ''}`}>
        <div className="ui-sidebar">
            <div className="ui-header">
                <h1>ReddRevolt</h1>
                <p>Faction: {faction}</p>
                <button onClick={() => setIsNightMode(!isNightMode)}>
                    {isNightMode ? 'Day Mode' : 'Night Mode'}
                </button>
            </div>
            <div className="ui-main">
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
        </div>
        <div className="game-area">
            <div className="ui-content">
                <ActivityFeed />
                <hr />
                <Polls poll={poll} />
                <hr />
                <Quests quests={quests} completedQuests={completedQuests} />
                <hr />
                <Achievements achievements={achievements} completedAchievements={completedAchievements} />
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