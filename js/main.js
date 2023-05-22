import { GameScene } from './Game.js';

// phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade'
    },
    scene: [GameScene]
};

// new game instance
const game = new Phaser.Game(config);
