export class GameScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        // load player spritesheet
        this.load.spritesheet('player', 'assets/Player.png', { frameWidth: 48, frameHeight: 48 });

        // load monsters spritesheet
        this.load.spritesheet('monsters', 'assets/monstersMain.ong', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // create player
    this.player = this.physics.add.sprite(100, 450, 'player');

    // create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // player animations
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    // pool of monsters
    this.monsters = this.physics.add.group();

    // animate each monster type
    for (let i = 0; i < 10; i++) {
        this.anims.create({
            key: 'monster' + i,
            frames: this.anims.generateFrameNumbers('monsters', { start: i * 10, end: i * 10 + 9 }),
            frameRate: 10,
            repeat: -1
        });
    }

    // timer event for spawning monsters
    this.monsterSpawnTimer = this.time.addEvent({
        delay: 3000, // spawn a monster every 3 seconds
        callback: this.spawnMonster,
        callbackScope: this,
        loop: true
    });
    }

    update() {
        // player movement
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(200);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.player.body.velocity.normalize().scale(speed);

    // Update the animation based on the velocity
    if (this.cursors.left.isDown) {
        this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
        this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
        this.player.anims.play('down', true);
    } else {
        this.player.anims.stop();
    }
}

    spawnMonster() {
        // Function to spawn monsters
gameScene.spawnMonster = function() {
    // if a monster already exists, remove it
    if (this.monsters.getLength()) {
        this.monsters.getFirstAlive().destroy();
    }

    // get a random monster type
    const monsterType = Phaser.Math.Between(0, 9);

    // create a new monster and add it to the group
    const monster = this.physics.add.sprite(
        Phaser.Math.Between(0, this.game.config.width),
        Phaser.Math.Between(0, this.game.config.height),
        'monsters'
    );

    // set properties for the monster
    monster.setBounce(1)
        .setCollideWorldBounds(true)
        .setScale(.5)
        .setDrag(1)
        .setData('type', monsterType);

    // add the monster to the group
    this.monsters.add(monster);

    // play the appropriate animation for this monster type
    monster.anims.play('monster' + monsterType, true);
    }
    }
}
