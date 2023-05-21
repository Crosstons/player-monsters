class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        gameScene.preload = function() {
            this.load.spritesheet('player', 'path/to/player_sprite.png', { frameWidth: 32, frameHeight: 48 });
            this.load.spritesheet('monster', 'path/to/monster_sprite.png', { frameWidth: 32, frameHeight: 48 });
        };
        
    }

    create() {
        gameScene.create = function() {
            // player creation
            this.player = this.physics.add.sprite(100, 450, 'player');
        
            // monster creation
            this.monster = this.physics.add.sprite(300, 450, 'monster');
          
            // create an object to store the key press
            this.cursors = this.input.keyboard.createCursorKeys();
        
            // animation for player
            const playerAnimations = [
                { key: 'left', frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }) },
                { key: 'right', frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }) },
                { key: 'up', frames: this.anims.generateFrameNumbers('player', { start: 10, end: 13 }) },
                { key: 'down', frames: this.anims.generateFrameNumbers('player', { start: 15, end: 18 }) }
            ];
        
            // create player animations
            playerAnimations.forEach(anim => {
                this.anims.create({
                    key: anim.key,
                    frames: anim.frames,
                    frameRate: 10,
                    repeat: -1
                });
            });
        
            // animation for monster
            const monsterAnimations = [
                { key: 'monsterleft', frames: this.anims.generateFrameNumbers('monster', { start: 0, end: 3 }) },
                { key: 'monsterright', frames: this.anims.generateFrameNumbers('monster', { start: 5, end: 8 }) },
                { key: 'monsterup', frames: this.anims.generateFrameNumbers('monster', { start: 10, end: 13 }) },
                { key: 'monsterdown', frames: this.anims.generateFrameNumbers('monster', { start: 15, end: 18 }) }
            ];
        
            // create monster animations
            monsterAnimations.forEach(anim => {
                this.anims.create({
                    key: anim.key,
                    frames: anim.frames,
                    frameRate: 10,
                    repeat: -1
                });
            });
        };
        
    }

    update() {
        gameScene.update = function() {
            // make the player stop when no key is pressed
            this.player.setVelocity(0);
        
            // update player position and animation based on key press
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.anims.play('left', true);
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
                this.player.anims.play('right', true);
            } else if (this.cursors.up.isDown) {
                this.player.setVelocityY(-160);
                this.player.anims.play('up', true);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(160);
                this.player.anims.play('down', true);
            } else {
                this.player.anims.stop();
            }
        
            // for monster, you can play any animation
            this.monster.anims.play('monsterleft', true);
        };
        
    }
}

export default GameScene;
