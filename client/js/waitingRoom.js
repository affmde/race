
let playerList=[];
let gameStatus={
    player1: {
        lap: 0,
        car: 'audi',
        resistence: 3000,
        ready: false,
        totalTime: 0
    },
    track: undefined,
    map: undefined,
    gameOver: false,
    winner: undefined
}
let opponents=[]

class WaitingRoom extends Phaser.Scene{
    constructor(){
        super({key: 'WaitingRoom'})
    }

    preload(){
        this.load.image('bg2', 'assets/bg2.png');
        this.load.image('bgBrown', 'assets/background_brown.png');
        this.load.image('btnYellow', 'assets/button_yellow.png');
        this.load.image('waitRoomBackBtn', 'assets/back_btn.png');
        this.load.image('waitRoomHomeBtn', 'assets/home_btn.png');
        /*this.randMap = Math.floor(Math.random()*tracks.length);
        console.log('randMap: ', this.randMap)
        gameStatus.track=tracks[this.randMap].name;
        gameStatus.map=tracks[this.randMap].map;*/
        //this.load.image(tracks[this.randMap].path, `assets/tracks/${tracks[this.randMap].path}.png`)
        tracks.forEach(track=>{
            this.load.image(track.path, `assets/tracks/${track.path}.png`)
        })
    }

    create(){
        socket= io();
        const bg= this.add.image(0,0,'bg2').setOrigin(0).setAlpha(0.7);
        const rect= this.add.image(w*0.5, h*0.5, 'bgBrown').setOrigin(0.5).setAlpha(0.5)
        const userTxt= this.add.text(w*0.2, h*0.15, 'Users', {fontSize: 40})
        //const trackName= this.add.text(w*0.75, h*0.25, gameStatus.track, {fontSize: 30}).setOrigin(0.5,0);
        //const trackPic= this.add.image(w*0.75, h*0.40, tracks[this.randMap].path).setOrigin(0.5,0);
        const topScores= this.add.text(w*0.75, h*0.71, 'Top 3 scores', {fontSize: 28}).setOrigin(0.5)
        //this.showBestScores(gameStatus.track);
        const backBtn= this.add.image(20, 20, 'waitRoomBackBtn').setOrigin(0).setInteractive({cursor: 'pointer'});
        const homeBtn= this.add.image(w-20, 20, 'waitRoomHomeBtn').setOrigin(1, 0).setInteractive({cursor: 'pointer'});
        backBtn.on('pointerdown', ()=>{
            backBtn.setAlpha(0.6);
        })
        backBtn.on('pointerup', ()=>{
            backBtn.setAlpha(1);
            socket.emit('backHome')
            socket.disconnect()
            this.scene.stop();
            this.scene.start('CarSelection')
        })
        backBtn.on('pointerout', ()=>backBtn.setAlpha(1))
        homeBtn.on('pointerdown', ()=>{
            homeBtn.setAlpha(0.6);
        })
        homeBtn.on('pointerup', ()=>{
            homeBtn.setAlpha(1);
            socket.emit('backHome')
            socket.disconnect()
            this.scene.stop();
            this.scene.start('HomeScene')
        })
        homeBtn.on('pointerout', ()=>homeBtn.setAlpha(1))

        socket.on('connect', ()=>{
            socket.emit('connected', ({id: socket.id, stats: gameStatus.player1, name: playerStats.username}))
        })
        this.playBtn= this.add.image(w*0.5, h*0.8, 'btnYellow').setOrigin(0.5).setScale(0.5);
        this.playBtnText= this.add.text(w*0.5, h*0.8, 'Waiting for more players', {fontSize: 22, wordWrap: { width: 200, useAdvancedWrap: true }}).setOrigin(0.5);
        this.playBtn.on('pointerdown', ()=>{
            gameStatus.player1.ready=!gameStatus.player1.ready;
            socket.emit('startPlay', {id: socket.id, play: true})
        })

        socket.on('clients', data=>{
            playerList=data;
            playerList.forEach((player, i)=>{
                this.numberText= this.add.text(w*0.15, h*0.25+i*50, i+1, {fontSize : 28})
                this.text= this.add.text(w*0.2, h*0.25+i*50, player.name, {fontSize : 28});
                this.text2= this.add.text(w*0.2, h*0.25+i*50+30, player.stats.car.name, {fontSize : 15});
            })
            opponents= playerList.filter(player=>player.id!==socket.id)
            const myPlayer= playerList.find(pl=>pl.id===socket.id);
            gameStatus.player1.position=myPlayer.position
        })
        socket.on('clientsCar', (data)=>{
            let a= opponents.find(o=>o.id===data.id)
        })
        
        socket.on('trackNumber',data=>{
            
            this.randMap = data
            
            gameStatus.track=tracks[this.randMap].name;
            gameStatus.map=tracks[this.randMap].map;

            const trackName= this.add.text(w*0.75, h*0.25, gameStatus.track, {fontSize: 30}).setOrigin(0.5,0);
            const trackPic= this.add.image(w*0.75, h*0.40, tracks[this.randMap].path).setOrigin(0.5,0);
            this.showBestScores(gameStatus.track);

        })
        socket.on('raceOn', ()=>{
            socket.disconnect()
            this.scene.stop();
            this.scene.start('RaceFull')
        })

        socket.on('play', data=>{
            if(data.play){
                this.scene.stop();
                this.scene.start('GameScene')
            }
        })
        
    }

    update(){
        if(playerList.length>1){
            this.playBtn.setInteractive({cursor: 'pointer'});
            this.playBtnText.setText('Play')
            this.playBtn.setVisible(true)
        }else{
            this.playBtn.disableInteractive();
            this.playBtnText.setText('Waiting for more players');
            this.playBtn.setVisible(false)
        }
    }

    showBestScores(track){
        if(track==='Fast Lain'){
            fastLainScores.forEach((score, i)=>{
                this.add.text(w*0.75, h*0.76+i*20, `${timeConverter(score.time)} - ${score.username}`).setOrigin(0.5);
            })
        }else if(track=== 'Last Diamond'){
            lastDiamondScores.forEach((score, i)=>{
                this.add.text(w*0.75, h*0.76+i*20, `${timeConverter(score.time)} - ${score.username}`).setOrigin(0.5);
            })
        }
    }
}

