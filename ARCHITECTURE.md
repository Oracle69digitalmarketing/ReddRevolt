# Reddit Rebellion - Architecture

This document outlines the technical architecture of "Reddit Rebellion." Our goal is a clean, scalable, and modern design that leverages the strengths of Devvit and Kiro.

## Core Components

Our architecture is composed of three main layers:

1.  **Frontend (Devvit Web):** The user-facing component of our application. It's what the player sees and interacts with inside of Reddit.
2.  **Backend (Devvit Functions):** Serverless functions that handle game logic which requires elevated permissions or access to a database.
3.  **Automation (Kiro):** The automation layer that orchestrates the game, responds to events, and manages the game state.

## Architecture Diagram

```mermaid
graph TD
    subgraph Reddit Platform
        A[User on Reddit] --> B{Interactive Game Post}
    end

    subgraph Devvit Web (Frontend)
        B --> C[Game UI (React)]
        C --> D{Actions (Raid, Defend)}
    end

    subgraph Kiro (Automation)
        B -- Upvote Event --> E[voteTrigger.js Hook]
        E --> F[Update Player Energy]
        G[roundSteering.yaml] -- Cron (24h) --> H[Trigger resolveRound]
    end

    subgraph Devvit Functions (Backend)
        H --> I[resolveRound Function]
        I --> J[Calculate Scores & Update Leaderboard]
    end

    A --> B
    D --> I
    F --> C
    J --> C
```

## Component Breakdown

*   **Interactive Game Post:** The main entry point for the game, embedded in a Reddit post. All gameplay happens here.

*   **Game UI (React):** The frontend of our game, built with React components. It displays the game state and allows players to take actions.

*   **Kiro `voteTrigger.js` Hook:** A real-time event listener. It detects when a user upvotes the game post and immediately grants them "Energy."

*   **Kiro `roundSteering.yaml`:** A steering rule that runs on a 24-hour schedule. It triggers our backend function to end the current game round.

*   **Devvit `resolveRound` Function:** Our main backend logic. It is responsible for:
    1.  Reading the game state at the end of a round.
    2.  Calculating the results of all player actions.
    3.  Determining the winning faction.
    4.  Updating the leaderboard.

## Data Flow

1.  A player upvotes the game post.
2.  The Kiro `voteTrigger` hook fires and updates the player's Energy.
3.  The player uses the Game UI to spend their Energy on an action (e.g., "Raid").
4.  At the end of the 24-hour round, the Kiro `roundSteering` rule triggers the `resolveRound` function.
5.  The `resolveRound` function processes all actions from the round and updates the game state.
6.  The Game UI reflects the new game state and leaderboards.

This architecture creates a seamless and responsive experience for the player, while automating the complex game logic on the backend.
