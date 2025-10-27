# ReddRevolt

> Your Karma is Power. Lead your faction to victory in a battle for control of Reddit.

**ReddRevolt** is an interactive multiplayer strategy game built for the **Reddit x Kiro Community Games Challenge**. It transforms passive browsing into an active, strategic battle for dominance, where every upvote is a weapon.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Gameplay

*   **Join a Faction:** Align yourself with one of three unique factions.
*   **Earn Energy:** Upvote the central "Battleground Post" to gain Energy.
*   **Take Action:** Spend your Energy to **Raid** your rivals, **Defend** your faction, or spread **Influence**.
*   **Conquer Reddit:** Compete in daily rounds and climb the leaderboards to lead your faction to glory.

## Features

*   **Real-time Multiplayer:** Play with and against other Redditors in a persistent game world.
*   **Deeply Integrated:** Uses core Reddit mechanics like upvotes and posts as part of the gameplay.
*   **Automated Gameplay:** Powered by Kiro for real-time event handling and automated round resolution.
*   **Built on Devvit Web:** A modern, web-based Reddit app experience.

## Tech Stack

*   **Frontend:** Devvit Web (React, TypeScript)
*   **Backend:** Devvit Functions
*   **Automation:** Kiro (Specs, Hooks, Steering)
*   **Version Control:** Git & GitHub

## Getting Started

### Prerequisites

*   Node.js
*   Devvit CLI
*   Kiro CLI

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/<your-username>/ReddRevolt.git
    cd ReddRevolt
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Our Submission

This project was created for the Reddit x Kiro Community Games Challenge. We are competing in the following categories:

*   **Best Game - Community Play**
*   **Best Kiro Developer Experience**

### Kiro Integration

We use Kiro to automate the core logic of our game:

*   **`/.kiro/specs`:** Defines our data models (`Player`, `Faction`).
*   **`/.kiro/hooks`:** A `voteTrigger.js` hook provides real-time Energy updates to players.
*   **`/.kiro/steering`:** A `roundSteering.yaml` rule automates our daily game rounds.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
