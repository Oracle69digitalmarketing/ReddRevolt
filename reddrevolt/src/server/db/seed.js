import Redis from 'ioredis';

const achievements = [
  {
    id: "firstFactionJoin",
    name: "First Step",
    description: "Join a faction for the first time.",
    trigger: "player:joinFaction",
    reward: "100 Energy",
  },
  {
    id: "firstRaid",
    name: "First Strike",
    description: "Successfully complete your first raid.",
    trigger: "action:raid",
    reward: "50 Energy",
  },
  {
    id: "masterDefender",
    name: "Master Defender",
    description: "Successfully defend your faction 10 times.",
    trigger: "action:defend:10", // Example: trigger with count
    reward: "200 Energy",
  }
];

const quests = [
  {
    id: "firstRaid",
    name: "First Strike",
    description: "Successfully complete your first raid.",
    trigger: "action:raid",
    reward: "100 Energy",
  },
  {
    id: "communityVoice",
    name: "Community Voice",
    description: "Vote in a poll.",
    trigger: "poll:vote",
    reward: "50 Energy",
  },
  {
    id: "rankUp",
    name: "Climbing the Ranks",
    description: "Achieve the rank of Rebel.",
    trigger: "rank:Rebel",
    reward: "200 Energy",
  }
];

async function seed() {
  const redis = new Redis();
  try {
    console.log('Seeding database...');

    // Seed achievements
    const achievementIds = achievements.map(achievement => achievement.id);
    await redis.sadd('achievements', ...achievementIds);
    for (const achievement of achievements) {
      await redis.set(`achievement:${achievement.id}`, JSON.stringify(achievement));
    }

    // Seed quests
    const questIds = quests.map(quest => quest.id);
    await redis.sadd('quests', ...questIds);
    for (const quest of quests) {
      await redis.set(`quest:${quest.id}`, JSON.stringify(quest));
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    redis.disconnect();
  }
}

seed();