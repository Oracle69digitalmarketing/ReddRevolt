import { Scene } from 'phaser';

export class SplashScreen extends Scene {
  constructor() {
    super('SplashScreen');
  }

  create() {
    this.add.image(512, 384, 'background').setAlpha(0.5);

    this.add.text(512, 300, 'ReddRevolt', {
      fontFamily: 'Arial Black',
      fontSize: 64,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
    }).setOrigin(0.5);

    const startButton = this.add.text(512, 450, 'Start Game', {
      fontFamily: 'Arial Black',
      fontSize: 38,
      color: '#ffffff',
      backgroundColor: '#444444',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    startButton.on('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
