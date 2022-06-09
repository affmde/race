config={
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 450,
    },
    parent: "gameDiv",
    dom: {
      createContainer: true
    },
    fullScreenTarget: document.getElementById('gameDiv'),
    backgroundColor: "b9baff",
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 },
      }
    },
    scene: [LoginScene, HomeScene, Shop,  RaceFull, CarSelection, Profile, SingleEndScene, DriverSelection, TrackSelection, WaitingRoom, GameOver, GameScene, SingleTimeTrail, EndScene]
}

const game = new Phaser.Game(config);

const w=game.config.width
const h= game.config.height
console.log(w, h);

