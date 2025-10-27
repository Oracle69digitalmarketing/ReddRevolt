# How to Build "ReddRevolt": A Step-by-Step Guide

This document is our master plan for the Reddit x Kiro Community Games Challenge. We will follow these steps to build, polish, and ship a winning submission.

## Phase 1: Setup and Scaffolding (Day 1)

### Step 1: Initialize Your Local Environment
1.  **Navigate to the project directory:**
    ```bash
    cd /home/sophiemabel69/ReddRevolt
    ```
2.  **Initialize Git:**
    ```bash
    git init
    ```
3.  **Connect to GitHub:** Once you create the `ReddRevolt` repository on GitHub, connect it to your local repository.
    ```bash
    git remote add origin <your-github-repo-url>
    ```

### Step 2: Scaffold the Devvit Web App
We will use the Devvit CLI to create a new project from a template. This gives us the basic structure of a Reddit app.

1.  **Run the Devvit creation command:**
    ```bash
    npx create-devvit-app@latest
    ```
2.  **Follow the prompts:**
    *   Choose a template. **React** or **Next.js** is recommended.
    *   Name your project `ReddRevolt`.
    *   This will create a new directory inside our project folder. We will move the contents into our main project directory.

### Step 3: Set up Kiro
Kiro is essential for the "Best Kiro Developer Experience" prize.

1.  **Install the Kiro CLI:** (If not already installed)
    ```bash
    npm install -g @kiro/cli
    ```
2.  **Initialize Kiro in the project:**
    ```bash
    kiro init
    ```
3.  This will create the `/.kiro` directory. We will populate this with our specs, hooks, and steering logic.

## Phase 2: Core Gameplay Development (Days 2-5)

### Step 4: Define Data Models with Kiro Specs
We will define our game's data structures in `/.kiro/specs.yaml`. This provides a clear data architecture.

*   **File:** `/.kiro/specs.yaml`
*   **Models:** `Player`, `Faction`, `GameRound`.

### Step 5: Build the Frontend (Devvit Web)
We will create the user interface for the game using React components.

*   **Splash Screen:** A visually appealing entry point to the game.
*   **Faction Selection:** A screen where players can join a faction.
*   **Main Game UI:** The interface for performing actions (Raid, Defend).
*   **Leaderboard:** A component to display top players and factions.

### Step 6: Implement Real-time Actions with Kiro Hooks
This is a key "wow" feature. We'll use a Kiro hook to react to Reddit events in real-time.

*   **File:** `/.kiro/hooks/voteTrigger.js`
*   **Logic:** This script will listen for upvotes on the game post. When an upvote is detected, it will instantly grant "Energy" to the player who voted.

### Step 7: Automate Game Logic with Kiro Steering
We will use Kiro steering to automate the game's daily cycle.

*   **File:** `/.kiro/steering/roundSteering.yaml`
*   **Logic:** A cron job will trigger a serverless function (`resolveRound`) every 24 hours to calculate scores and end the round.

### Step 8: Develop the Backend (Devvit Functions)
We need a server-side function to handle the end-of-round logic.

*   **File:** `src/server/actions/resolveRound.js`
*   **Logic:** This function will be triggered by our Kiro steering rule. It will read all the game data, calculate the scores for each faction, and update the leaderboard.

## Phase 3: Polish and Submission (Days 6-7)

### Step 9: "Wow" Features - Going the Extra Mile
To win, we need to impress the judges. Here are some ideas:
*   **Live Activity Feed:** A real-time feed showing actions taken by other players.
*   **Faction-Specific Themes:** The UI could change color and style based on the player's chosen faction.
*   **Achievements and Badges:** Reward players for reaching certain milestones (e.g., "Top Raider," "Master Defender").
*   **Advanced Kiro Automation:** Implement a Kiro hook that detects when a new player joins and automatically sends them a welcome message.

### Step 10: Create Submission Assets
We need to prepare all the required materials for our Devpost submission.
*   **`README.md`:** A detailed explanation of the project.
*   **`ARCHITECTURE.md`:** A diagram and description of our technical architecture.
*   **`VIDEO_SCRIPT.md`:** A script for our 2-3 minute Kiro demo video.
*   **Demo Post:** A post on Reddit that runs our game.

### Step 11: Final Testing and Deployment
*   Thoroughly test the game for bugs.
*   Ensure the app is compliant with all Devvit rules.
*   Deploy the app to the Reddit Developer Platform.

### Step 12: Submit!
*   Complete the Devpost submission form.
*   Link to the GitHub repo, the demo post, and the Kiro video.
*   Fill out the optional feedback survey.

---
This is our roadmap. We will follow it closely to ensure we deliver a high-quality, competitive project.

---

## Upgrade Plan: The Social Experiment

The goal is to transform passive participation into active, rewarding engagement through karma-based ranks, community-driven polls, and challenging quests.

### Phase 1: Data Model Expansion (`/.kiro/specs.yaml`)

First, we'll expand your Kiro data models to support the new features. This is the foundation for everything else.

*   **`Rank` Model:** To create a clear progression path for players.
    *   `name`: (e.g., "Recruit", "Rebel", "Warlord")
    *   `minKarma`: The karma threshold to achieve the rank.
    *   `iconUrl`: A URL to a custom icon for each rank.

*   **`Poll` Model:** To give the community a voice and drive engagement.
    *   `question`: The text of the poll.
    *   `options`: A list of answer choices.
    *   `votes`: A map to track which players voted for which option.
    *   `endsAt`: A timestamp for when the poll automatically closes.

*   **`Quest` Model:** To guide players and reward specific actions.
    *   `name`: (e.g., "First Strike", "Community Voice", "Top 10 Raider")
    *   `description`: What the player needs to do to complete it.
    *   `reward`: The prize for completion (e.g., bonus Energy, a special badge).
    *   `trigger`: The game event that signals completion (e.g., `action:raid`, `poll:vote`).

*   **Update `Player` Model:**
    *   Add a `rank` field to store the player's current rank name.
    *   Add a `completedQuests` list to track their achievements.

### Phase 2: Backend Logic (`src/server/`)

Next, we'll build the server-side functions to power these new features.

*   **`rankManager.js`:**
    *   A function that automatically calculates and updates a player's rank based on their karma. This will be triggered by a Kiro hook.

*   **`pollManager.js`:**
    *   Functions to handle poll creation, voting, and tallying the results. These will be called from your frontend.

*   **`questEngine.js`:**
    *   A set of functions that listen for game events and check if a player has met the criteria for any active quests.

### Phase 3: Frontend UI/UX (`src/client/`)

Now, we'll create the visual components for players to interact with.

*   **`RankDisplay.js` Component:**
    *   A UI element to proudly display a player's rank and icon next to their username.

*   **`Polls.js` Component:**
    *   A dedicated section in the UI for viewing and voting on active polls, and seeing the results of past polls.

*   **`Quests.js` Component:**
    *   A UI to show players a list of available quests, their progress, and the rewards they can earn.

### Phase 4: Kiro Automation (`/.kiro/`)

Finally, we'll use Kiro to automate the new game loops and create a seamless, real-time experience.

*   **`hooks/onKarmaChange.js`:**
    *   A Kiro hook that triggers whenever a player's karma changes. It will call your `rankManager.js` function to check for a rank-up.

*   **`steering/pollLifecycle.yaml`:**
    *   A Kiro steering rule that runs on a schedule (e.g., daily) to automatically close finished polls and trigger the backend logic to process the results.

*   **`hooks/onGameEvent.js`:**
    *   A versatile Kiro hook that listens for various in-game actions (like `raid`, `defend`, `vote`). It will feed these events to your `questEngine.js` to check for quest completions in real-time.