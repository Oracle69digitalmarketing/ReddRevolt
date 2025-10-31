import { redis } from '@devvit/web/server';

import { addActivityFeedEvent } from './activityFeed.js';

/**
 * Initializes the game data in the data store if it doesn't exist.
 */
export async function initialize() {
    const players = await redis.get('players');
    if (!players) {
        const initialPlayers = new Map([
            ['player1', { id: 'player1', name: 'Player 1', energy: 100, faction: null }],
        ]);
        await redis.set('players', JSON.stringify(Array.from(initialPlayers.entries())));
    }

    const factions = await redis.get('factions');
    if (!factions) {
        const initialFactions = new Map([
            ['Red', { name: 'Red', score: 0 }],
            ['Blue', { name: 'Blue', score: 0 }],
            ['Green', { name: 'Green', score: 0 }],
        ]);
        await redis.set('factions', JSON.stringify(Array.from(factions.entries())));
    }
}

/**
 * Allows a player to join a faction.
 *
 * @param {string} playerId The ID of the player.
 * @param {string} factionName The name of the faction to join.
 * @returns {Promise<{success: boolean}>} The result of the action.
 */
export async function joinFaction(playerId, factionName) {
    const players = new Map(JSON.parse(await redis.get('players')));
    const factions = new Map(JSON.parse(await redis.get('factions')));
    const player = players.get(playerId);
    const faction = factions.get(factionName);

    if (!player || !faction || player.faction) {
        return { success: false };
    }

    player.faction = factionName;
    await redis.set('players', JSON.stringify(Array.from(players.entries())));
    addActivityFeedEvent(`${player.name} has joined the ${factionName} faction!`);

    return { success: true };
}

/**
 * Performs a raid action for a player.
 *
 * @param {string} playerId The ID of the player performing the raid.
 * @param {number} cost The energy cost of the raid.
 * @returns {Promise<{success: boolean, newEnergy: number}>} The result of the raid.
 */
export async function performRaid(playerId, cost) {
    const players = new Map(JSON.parse(await redis.get('players')));
    const factions = new Map(JSON.parse(await redis.get('factions')));
    const player = players.get(playerId);

    if (!player || !player.faction || player.energy < cost) {
        return { success: false, newEnergy: player ? player.energy : 0 };
    }

    player.energy -= cost;

    const enemyFactions = Array.from(factions.keys()).filter(f => f !== player.faction);
    const targetFactionName = enemyFactions[Math.floor(Math.random() * enemyFactions.length)];
    const targetFaction = factions.get(targetFactionName);
    targetFaction.score -= 5;

    await redis.set('players', JSON.stringify(Array.from(players.entries())));
    await redis.set('factions', JSON.stringify(Array.from(factions.entries())));

    addActivityFeedEvent(`${player.name} has raided the ${targetFactionName} faction!`);
    return { success: true, newEnergy: player.energy };
}

/**
 * Performs a defend action for a player.
 *
 * @param {string} playerId The ID of the player performing the action.
 * @param {number} cost The energy cost of the action.
 * @returns {Promise<{success: boolean, newEnergy: number}>} The result of the action.
 */
export async function performDefend(playerId, cost) {
    const players = new Map(JSON.parse(await redis.get('players')));
    const factions = new Map(JSON.parse(await redis.get('factions')));
    const player = players.get(playerId);

    if (!player || !player.faction || player.energy < cost) {
        return { success: false, newEnergy: player ? player.energy : 0 };
    }

    player.energy -= cost;
    const playerFaction = factions.get(player.faction);
    playerFaction.score += 5;

    await redis.set('players', JSON.stringify(Array.from(players.entries())));
    await redis.set('factions', JSON.stringify(Array.from(factions.entries())));

    addActivityFeedEvent(`${player.name} has defended the ${player.faction} faction!`);
    return { success: true, newEnergy: player.energy };
}

/**
 * Performs an influence action for a player.
 *
 * @param {string} playerId The ID of the player performing the action.
 * @param {number} cost The energy cost of the action.
 * @returns {Promise<{success: boolean, newEnergy: number}>} The result of the action.
 */
export async function performInfluence(playerId, cost) {
    const players = new Map(JSON.parse(await redis.get('players')));
    const factions = new Map(JSON.parse(await redis.get('factions')));
    const player = players.get(playerId);

    if (!player || !player.faction || player.energy < cost) {
        return { success: false, newEnergy: player ? player.energy : 0 };
    }

    player.energy -= cost;
    const playerFaction = factions.get(player.faction);
    playerFaction.score += 2; // Smaller bonus for influence

    const enemyFactions = Array.from(factions.keys()).filter(f => f !== player.faction);
    const targetFactionName = enemyFactions[Math.floor(Math.random() * enemyFactions.length)];
    const targetFaction = factions.get(targetFactionName);
    targetFaction.score += 1; // Small bonus to a random enemy faction


    await redis.set('players', JSON.stringify(Array.from(players.entries())));
    await redis.set('factions', JSON.stringify(Array.from(factions.entries())));

    addActivityFeedEvent(`${player.name} has influenced the ${player.faction} and ${targetFactionName} factions!`);
    return { success: true, newEnergy: player.energy };
}

/**
 * Gets the scores of all factions.
 *
 * @returns {Promise<object[]>} A list of factions with their scores.
 */
export async function getFactionScores() {
    const factions = new Map(JSON.parse(await redis.get('factions')));
    return Array.from(factions.values());
}

/**
 * Updates a player's rank.
 *
 * @param {string} playerId The ID of the player.
 * @param {string} newRank The new rank for the player.
 */
export async function updatePlayerRank(playerId, newRank) {
    const players = new Map(JSON.parse(await redis.get('players')));
    const player = players.get(playerId);
    if (player) {
        player.rank = newRank;
        await redis.set('players', JSON.stringify(Array.from(players.entries())));
    }
}

/**
 * Adds a completed quest to a player's record.
 *
 * @param {string} playerId The ID of the player.
 * @param {string} questId The ID of the completed quest.
 */
export async function addCompletedQuest(playerId, questId) {
    const players = new Map(JSON.parse(await redis.get('players')));
    const player = players.get(playerId);
    if (player && !player.completedQuests.includes(questId)) {
        player.completedQuests.push(questId);
        await redis.set('players', JSON.stringify(Array.from(players.entries())));
    }
}

/**
 * Adds a completed achievement to a player's record.
 *
 * @param {string} playerId The ID of the player.
 * @param {string} achievementId The ID of the completed achievement.
 */
export async function addCompletedAchievement(playerId, achievementId) {
    const players = new Map(JSON.parse(await redis.get('players')));
    const player = players.get(playerId);
    if (player && !player.completedAchievements.includes(achievementId)) {
        player.completedAchievements.push(achievementId);
        await redis.set('players', JSON.stringify(Array.from(players.entries())));
    }
}
