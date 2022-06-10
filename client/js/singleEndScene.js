class SingleEndScene extends Phaser.Scene{
    constructor(){
        super({key: 'SingleEndScene'})
    }

    init(data){
        console.log('initData', data)
        this.lapTime= data.lap[0].time
    }

    preload(){
        this.load.image('sesBg', 'assets/gameOverBg.png');
        this.load.image('sesYes', 'assets/yes.png');
        this.load.image('sesNo', 'assets/no.png');
        this.load.image('sesContinue', 'assets/blue_sliderRight.png');
        this.load.image('sesCoins', 'assets/coins.png');
    }

    create(){
        this.updateXp=false;
        const bg= this.add.image(0,0,'sesBg').setOrigin(0).setAlpha(0.7);
        const lapTime= this.add.text(w*0.5, h*0.25, `Your lap: ${timeConverter(this.lapTime)}`, {fontSize: 35}).setOrigin(0.5);
        if(gameStatus.track==='Fast Lain'){
            this.time.delayedCall(500,()=>{
                this.add.text(w*0.15, h*0.5, `Beat fast lap: ${timeConverter(fastLainScores[0].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.5, this.compareLaps(gameStatus.track, this.lapTime, 0) ? 'sesYes' : 'sesNo').setOrigin(0);
            });
            this.time.delayedCall(1000, ()=>{
                this.add.text(w*0.15, h*0.6, `Beat second fast lap: ${timeConverter(fastLainScores[1].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.6, this.compareLaps(gameStatus.track, this.lapTime, 1) ? 'sesYes' : 'sesNo').setOrigin(0);
            })
            this.time.delayedCall(1500, ()=>{
                this.add.text(w*0.15, h*0.7, `Beat fast lap: ${timeConverter(fastLainScores[2].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.7, this.compareLaps(gameStatus.track, this.lapTime, 2) ? 'sesYes' : 'sesNo').setOrigin(0);
            })
            
        }else if(gameStatus.track==='Last Diamond'){
            this.time.delayedCall(500,()=>{
                this.add.text(w*0.15, h*0.5, `Beat fast lap: ${timeConverter(lastDiamondScores[0].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.5, this.compareLaps(gameStatus.track, this.lapTime, 0) ? 'sesYes' : 'sesNo').setOrigin(0);
            });
            this.time.delayedCall(1000, ()=>{
                this.add.text(w*0.15, h*0.6, `Beat second fast lap: ${timeConverter(lastDiamondScores[1].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.6, this.compareLaps(gameStatus.track, this.lapTime, 1) ? 'sesYes' : 'sesNo').setOrigin(0);
            })
            this.time.delayedCall(1500, ()=>{
                this.add.text(w*0.15, h*0.7, `Beat fast lap: ${timeConverter(lastDiamondScores[2].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.7, this.compareLaps(gameStatus.track, this.lapTime, 2) ? 'sesYes' : 'sesNo').setOrigin(0);
            })
        }

        this.time.delayedCall(2000, ()=>{
            this.coinsReward()
            this.playerXp= playerStats.experience;
            this.nextLevelXp= getLevel().total;
            playerStats.experience+=xpReward(this.compareLaps(gameStatus.track, this.lapTime, 0), this.compareLaps(gameStatus.track, this.lapTime, 1), this.compareLaps(gameStatus.track, this.lapTime, 2), true, false);
            const rectFullXp= this.add.rectangle(200, h*0.9, 400, 30, 0xDCDCDC).setOrigin(0);
            this.nowXp= this.add.rectangle(200, h*0.9, this.playerXp*400/this.nextLevelXp, 30, 0xDAA520).setOrigin(0);
            this.updateXp= true;
            this.add.text(w*0.5, h*0.9-20, 'Xp points')
            
        })
        this.time.delayedCall(2500, ()=>{
            this.continueBtn= this.add.image(700, h*0.9, 'sesContinue').setOrigin(0.5).setInteractive({cursor: 'pointer'}).setScale(2.5,1.5);
            this.add.text(700, h*0.9, 'Continue').setOrigin(0.5)
            this.continueBtn.on('pointerdown',()=>{
                typeOfGame=undefined;
                gameStatus.player1.lap=0
                saveReward()
                this.scene.stop();
                this.scene.start('HomeScene')
            })
        })
    }

    update(){
        if(this.updateXp){
            while(this.playerXp !== playerStats.experience){
                this.playerXp++
                this.nowXp.destroy();
                this.nowXp= this.add.rectangle(200, h*0.9, this.playerXp*400/this.nextLevelXp, 30, 0xDAA520).setOrigin(0);
                console.log(playerStats.experience)
            }
        }
    }

    compareLaps(track, lap, index){
        if(track==='Fast Lain'){
            const lapToCompare= fastLainScores[index].time;
            if(lap<lapToCompare){
                return true
            }else {
                return false
            }

        }else if(track==='Last Diamond'){
            const lapToCompare= lastDiamondScores[index].time;
            if(lap<lapToCompare){
                return true
            }else {
                return false
            }
        }
    }

    coinsReward(){
        const lap1= this.compareLaps(gameStatus.track, this.lapTime, 0);
        const lap2= this.compareLaps(gameStatus.track, this.lapTime, 1);
        const lap3= this.compareLaps(gameStatus.track, this.lapTime, 2)
        console.log(lap1, lap2, lap3)
        if(lap1){
            const rand= Math.floor(Math.random()*200);
            playerStats.coins+=rand;
            this.add.image(700, h*0.75, 'sesCoins').setOrigin(0.5);
            this.add.text(750, h*0.75, `+${rand}`);
        }else if(lap2){
            const rand= Math.floor(Math.random()*120);
            playerStats.coins+=rand;
            this.add.image(700, h*0.75, 'sesCoins').setOrigin(0.5);
            this.add.text(750, h*0.75, `+${rand}`);
        }else if(lap3){
            const rand= Math.floor(Math.random()*70);
            playerStats.coins+=rand
            this.add.image(700, h*0.75, 'sesCoins').setOrigin(0.5);
            this.add.text(750, h*0.75, `+${rand}`);
        }else{
            return
        }
    }
}