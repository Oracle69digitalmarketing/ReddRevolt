# Kiro Developer Experience - Video Script

**Title:** Automating a Reddit Game with Kiro
**Duration:** 2-3 minutes
**Style:** Fast-paced, informative, and developer-focused.

---

### Scene 1: The Problem (0:00 - 0:20)

**(Visual: A screen recording of someone manually updating a spreadsheet with game scores. The process looks slow and tedious.)**

**Narrator:** "Building a real-time, multiplayer game on Reddit is complex. How do you manage game state? How do you react to player actions instantly? How do you run the game 24/7 without manual intervention?"

**(Visual: Transition to the "Reddit Rebellion" game UI, looking polished and dynamic.)**

**Narrator:** "We built Reddit Rebellion, a fully automated multiplayer strategy game, and we solved these problems using Kiro."

---

### Scene 2: The Solution: Kiro Specs (0:20 - 0:45)

**(Visual: A screen recording of the Kiro IDE, showing the `specs.yaml` file. The `Player` and `Faction` models are highlighted.)**

**Narrator:** "It all starts with a clear data architecture. With Kiro Specs, we defined our game models in a simple YAML file. This became the single source of truth for our entire application, ensuring consistency between our frontend and backend."

---

### Scene 3: Real-time Events with Kiro Hooks (0:45 - 1:20)

**(Visual: Split screen. On the left, the Reddit game post. On the right, the Kiro IDE showing the `voteTrigger.js` hook and the logs.)**

**Narrator:** "Next, we needed real-time responsiveness. We wrote a Kiro hook that listens for upvote events on our game post."

**(Visual: The user on the left upvotes the post. Instantly, the logs on the right show the hook firing and a message like "Energy incremented for user X.")**

**Narrator:** "Watch this. When a player upvotes, the hook fires instantly, granting them in-game Energy. No lag, no manual updates. This is the power of Kiro's event-driven architecture."

---

### Scene 4: Automation with Kiro Steering (1:20 - 1:50)

**(Visual: A screen recording of the Kiro IDE, showing the `roundSteering.yaml` file. The cron job schedule is highlighted.)**

**Narrator:** "But what about managing the game over time? Our game runs in 24-hour rounds. Manually ending a round each day would be a nightmare. So, we automated it with Kiro Steering."

**(Visual: The steering rule is shown, triggering the `resolveRound` function.)**

**Narrator:** "This simple steering rule defines a cron job that automatically triggers our `resolveRound` function every 24 hours. This function calculates the scores, declares a winner, and resets the game for the next day. Our game now runs itself, 24/7."

---

### Scene 5: The Impact (1:50 - 2:15)

**(Visual: A fast-paced montage of the three Kiro files: `specs.yaml`, `voteTrigger.js`, and `roundSteering.yaml`.)**

**Narrator:** "By using Kiro, we transformed our development workflow. We offloaded complex, repetitive tasks to the Kiro platform, allowing us to focus on what really matters: building a fun and engaging game."

**(Visual: A final shot of the polished "Reddit Rebellion" game, with players actively participating.)**

**Narrator:** "This is the future of app development on Reddit. This is the Kiro developer experience."

**(Visual: End screen with the game title, your team name, and the Kiro logo.)**
