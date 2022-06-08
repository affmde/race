class GameOver extends Phaser.Scene{
    constructor(){
        super({key: 'GameOver'})
    }

    preload(){
        this.load.image('gameOverBg', 'assets/gameOverBg.png');
        this.load.image('gameOverConfirmBtn', 'assets/button_blue.png')
    }

    create(){
        const bg= this.add.image(0,0,'gameOverBg').setOrigin(0).setAlpha(0.7);
        const gameOverTitle= this.add.text(w*0.5, h*0.1, 'Game Over', {fontSize: 30}).setOrigin(0.5);
        const totalTime= timeConverter(gameStatus.player1.totalTime)
        const timeRace= this.add.text(w*0.1, h*0.3, `Time played: ${totalTime}`);
        laps.forEach((lap, i)=>{
            const lapTime= timeConverter(lap.time)
            this.add.text(w*0.1, h*0.4+30*i, `Lap ${lap.lap}: ${lapTime}`)
        })
        const confirmBtn= this.add.image(w*0.5, h*0.9, 'gameOverConfirmBtn').setOrigin(0.5).setInteractive({cursor: 'pointer'})
        const confirmText= this.add.text(w*0.5, h*0.9, 'Continue').setOrigin(0.5);
        confirmBtn.on('pointerdown', ()=>{
            gameStatus.player1.lap=0;
            gameStatus.player1.resistence=3000;
            gameStatus.player1.ready=false;
            gameStatus.winner=undefined;
            gameStatus.gameOver=false;
            gameStatus.player1.totalTime=0
            if(typeOfGame==='multiplayer'){
                socket.emit('backHome');
                socket.disconnect();
            }
            typeOfGame=undefined;
            laps=[];
            pause=true
            this.scene.stop();
            this.scene.start('HomeScene')
        })
    }

    update(){

    }
}