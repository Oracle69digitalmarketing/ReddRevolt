import { Scene } from 'phaser';
import * as Phaser from 'phaser';

interface Player {
  name: string;
  faction: string | null;
  energy: number;
  rank: string;
}

interface Faction {
  name: string;
  score: number;
}

interface GameRound {
  roundNumber: number;
  startTime: number;
  endTime: number;
}

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  player: Player;
  factions: Faction[];
  gameRound: GameRound;
  joinRedButton: Phaser.GameObjects.Text;
  joinBlueButton: Phaser.GameObjects.Text;
  joinGreenButton: Phaser.GameObjects.Text;
  raidButton: Phaser.GameObjects.Text;
  defendButton: Phaser.GameObjects.Text;
  leaderboardPanel: Phaser.GameObjects.Graphics;
  leaderboardTitle: Phaser.GameObjects.Text;
  leaderboardText: Phaser.GameObjects.Text[];
  playerText: Phaser.GameObjects.Text[];
  factionText: Phaser.GameObjects.Text[];

  constructor() {
    super('Game');
  }

  create() {
    this.camera = this.cameras.main;
    this.background = this.add.image(512, 384, 'background').setAlpha(1);

    this.player = { name: 'Player1', faction: null, energy: 100, rank: 'Recruit' };
    this.factions = [
      { name: 'Red', score: 0 },
      { name: 'Blue', score: 0 },
      { name: 'Green', score: 0 },
    ];
    this.gameRound = { roundNumber: 1, startTime: Date.now(), endTime: Date.now() + 60000 };

    this.add.text(100, 100, `Round: ${this.gameRound.roundNumber}`);

    this.joinRedButton = this.add.text(100, 300, 'Join Red', { backgroundColor: '#ff0000', padding: { x: 10, y: 5 } })
      .setInteractive()
      .on('pointerdown', () => {
        this.player.faction = 'Red';
        this.sound.play('join_faction');
        this.updateUI();
      });

    this.joinBlueButton = this.add.text(200, 300, 'Join Blue', { backgroundColor: '#0000ff', padding: { x: 10, y: 5 } })
      .setInteractive()
      .on('pointerdown', () => {
        this.player.faction = 'Blue';
        this.sound.play('join_faction');
        this.updateUI();
      });

    this.joinGreenButton = this.add.text(300, 300, 'Join Green', { backgroundColor: '#00ff00', padding: { x: 10, y: 5 } })
      .setInteractive()
      .on('pointerdown', () => {
        this.player.faction = 'Green';
        this.sound.play('join_faction');
        this.updateUI();
      });

    this.raidButton = this.add.text(100, 350, 'Raid', { backgroundColor: '#ff0000', padding: { x: 10, y: 5 } })
      .setInteractive()
      .on('pointerdown', () => {
        if (this.player.faction) {
          this.sound.play('raid');
          const playerFaction = this.factions.find(f => f.name === this.player.faction);
          const otherFactions = this.factions.filter(f => f.name !== this.player.faction);
          const targetFaction = otherFactions[Math.floor(Math.random() * otherFactions.length)];

          if (playerFaction) {
            playerFaction.score += 10;
          }
          if (targetFaction) {
            targetFaction.score -= 5;
          }
          this.createActionParticles();
          this.shakeCamera();
          this.showActionAnimation('Raid');
          this.updateUI();
        }
      });

    this.defendButton = this.add.text(200, 350, 'Defend', { backgroundColor: '#00ff00', padding: { x: 10, y: 5 } })
      .setInteractive()
      .on('pointerdown', () => {
        if (this.player.faction) {
          this.sound.play('defend');
          const playerFaction = this.factions.find(f => f.name === this.player.faction);
          if (playerFaction) {
            playerFaction.score += 5;
          }
          this.createActionParticles();
          this.shakeCamera();
          this.showActionAnimation('Defend');
          this.updateUI();
        }
      });

    this.leaderboardPanel = this.add.graphics();
    this.leaderboardPanel.fillStyle(0x000000, 0.8);
    this.leaderboardPanel.fillRect(200, 100, 400, 300);
    this.leaderboardPanel.setVisible(false);

    this.leaderboardTitle = this.add.text(400, 120, 'Leaderboard', { fontSize: '24px' }).setOrigin(0.5);
    this.leaderboardTitle.setVisible(false);

    this.leaderboardText = [];

    const leaderboardButton = this.add.text(500, 350, 'Leaderboard', { backgroundColor: '#888888', padding: { x: 10, y: 5 } })
      .setInteractive()
      .on('pointerdown', () => {
        const isVisible = this.leaderboardPanel.visible;
        this.leaderboardPanel.setVisible(!isVisible);
        this.leaderboardTitle.setVisible(!isVisible);
        this.leaderboardText.forEach(text => text.setVisible(!isVisible));
        if (!isVisible) {
          this.updateLeaderboard();
        }
      });

    this.time.addEvent({
      delay: 1000,
      callback: this.gameLoop,
      callbackScope: this,
      loop: true,
    });

    this.updateUI();
  }

  createActionParticles() {
    this.add.particles(400, 300, 'particle', {
      speed: 100,
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
      lifespan: 1000,
      quantity: 10
    });
  }

  shakeCamera() {
    this.cameras.main.shake(100, 0.01);
  }

  showActionAnimation(action: string) {
    const actionText = this.add.text(400, 400, `${action}!`, { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
    this.tweens.add({
      targets: actionText,
      alpha: 0,
      duration: 1000,
      ease: 'Power2'
    });
  }

  updateLeaderboard() {
    this.leaderboardText.forEach(text => text.destroy());
    this.leaderboardText = [];

    this.factions.forEach((faction, index) => {
      const text = this.add.text(400, 180 + index * 40, `${faction.name}: ${faction.score}`, { fontSize: '20px' }).setOrigin(0.5);
      text.setVisible(false);
      this.leaderboardText.push(text);
    });
  }

  updateUI() {
    if (this.factionText) this.factionText.forEach(text => text.destroy());
    if (this.playerText) this.playerText.forEach(text => text.destroy());

    this.factionText = [];
    this.factionText.push(this.add.text(100, 150, `Factions:`));
    this.factionText.push(this.add.text(100, 200, `${this.factions[0].name}: ${this.factions[0].score}`));
    this.factionText.push(this.add.text(100, 250, `${this.factions[1].name}: ${this.factions[1].score}`));
    this.factionText.push(this.add.text(100, 300, `${this.factions[2].name}: ${this.factions[2].score}`));

    this.playerText = [];
    this.playerText.push(this.add.text(400, 100, `Player: ${this.player.name}`));
    this.playerText.push(this.add.text(400, 150, `Faction: ${this.player.faction || 'None'}`));
    this.playerText.push(this.add.text(400, 200, `Energy: ${this.player.energy}`));
    this.playerText.push(this.add.text(400, 250, `Rank: ${this.player.rank}`));

    if (this.player.faction) {
      this.joinRedButton.setVisible(false);
      this.joinBlueButton.setVisible(false);
      this.joinGreenButton.setVisible(false);
      this.raidButton.setVisible(true);
      this.defendButton.setVisible(true);
    } else {
      this.joinRedButton.setVisible(true);
      this.joinBlueButton.setVisible(true);
      this.joinGreenButton.setVisible(true);
      this.raidButton.setVisible(false);
      this.defendButton.setVisible(false);
    }
  }

  gameLoop() {
    if (Date.now() > this.gameRound.endTime) {
      this.factions.forEach(f => f.score += Math.floor(Math.random() * 100));

      this.gameRound.roundNumber++;
      this.gameRound.startTime = Date.now();
      this.gameRound.endTime = Date.now() + 60000;

      this.updateUI();
    }
  }
}
