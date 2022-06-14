class EndScene extends Phaser.Scene{
    constructor(){
        super({key: 'EndScene'})
    }

    preload(){
        this.load.image('podium', 'assets/podium.png');
        this.load.image('btnBlue', 'assets/button_blue.png');
        drivers.forEach(driver=>{
            this.load.image(`endScene${driver.path}`, `assets/characters/${driver.path}.png`)
        })
        this.load.image('esYes', 'assets/yes.png');
        this.load.image('esNo', 'assets/no.png');
        this.load.image('esCoins', 'assets/coins.png');
    }

    create(){
        this.updateXp=false;
        this.add.image(0,0,'podium').setOrigin(0).setAlpha(0.7);
        this.winnerText= this.add.text(w/2, h*0.2, `${gameStatus.winner.username} won!`, {fontSize: 40}).setOrigin(0.5);
        this.add.image(w*0.5, 347, `endScene${gameStatus.winner.driver}`).setOrigin(0.5,1)
        let homeBtn= this.add.image(w*0.5, h*0.9,'btnBlue').setOrigin(0.5).setScale(0.5);
        let homeTxt= this.add.text(w*0.5, h*0.9, 'Home', {fontSize: 25}).setOrigin(0.5)
        const lapSort= laps.sort((a,b)=>a.time-b.time);
        this.bestLap=lapSort[0].time;
        this.lap1=laps[0].time;
        this.lap2=laps[1].time;
        this.lap3= laps[2].time;
        this.time.delayedCall(2500, ()=>{
            const rect= this.add.rectangle(w*0.1, h*0.1, w*0.8, h*0.8, 0x000000).setAlpha(0.6).setOrigin(0);
            this.winnerText.destroy();
            const lapTime1= this.add.text(w*0.5, h*0.15, `Your first lap:  : ${timeConverter(this.lap1)}`, {fontSize: 20}).setOrigin(0.5);
            const lapTime2= this.add.text(w*0.5, h*0.22, `Your second lap: ${timeConverter(this.lap2)}`, {fontSize: 20}).setOrigin(0.5);
            const lapTime3= this.add.text(w*0.5, h*0.29, `Your third lap: ${timeConverter(this.lap3)}`, {fontSize: 20}).setOrigin(0.5);
        })
        if(gameStatus.track==='Fast Lain'){
            this.time.delayedCall(3500,()=>{
                this.add.text(w*0.15, h*0.38, `Beat fastest lap: ${timeConverter(fastLainScores[0].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.38, this.compareLaps(gameStatus.track, this.bestLap, 0) ? 'esYes' : 'esNo').setOrigin(0);
            });
            this.time.delayedCall(4500, ()=>{
                this.add.text(w*0.15, h*0.46, `Beat secondest fast lap: ${timeConverter(fastLainScores[1].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.46, this.compareLaps(gameStatus.track, this.bestLap, 1) ? 'esYes' : 'esNo').setOrigin(0);
            })
            this.time.delayedCall(5500, ()=>{
                this.add.text(w*0.15, h*0.54, `Beat third fastest lap: ${timeConverter(fastLainScores[2].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.54, this.compareLaps(gameStatus.track, this.bestLap, 2) ? 'esYes' : 'esNo').setOrigin(0);
            })
            
        }else if(gameStatus.track==='Last Diamond'){
            this.time.delayedCall(3500,()=>{
                this.add.text(w*0.15, h*0.38, `Beat fastest lap: ${timeConverter(lastDiamondScores[0].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.38, this.compareLaps(gameStatus.track, this.bestLap, 0) ? 'esYes' : 'esNo').setOrigin(0);
            });
            this.time.delayedCall(4500, ()=>{
                this.add.text(w*0.15, h*0.46, `Beat second fastest lap: ${timeConverter(lastDiamondScores[1].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.46, this.compareLaps(gameStatus.track, this.bestLap, 1) ? 'esYes' : 'esNo').setOrigin(0);
            })
            this.time.delayedCall(5500, ()=>{
                this.add.text(w*0.15, h*0.54, `Beat third fastest lap: ${timeConverter(lastDiamondScores[2].time)}`, {fontSize: 23});
                this.add.image(w*0.8, h*0.54, this.compareLaps(gameStatus.track, this.bestLap, 2) ? 'esYes' : 'esNo').setOrigin(0);
            })

        }

        this.time.delayedCall(6500, ()=>{
            this.add.text(w*0.15, h*0.62, `Race won: `, {fontSize: 23});
            this.add.image(w*0.8, h*0.62, this.checkIfWinner() ? 'esYes' : 'esNo').setOrigin(0);
        })

        this.time.delayedCall(7500, ()=>{
            this.totalXpCalc= getLevel().total-getLevel().before;
            this.playerXp= playerStats.experience-getLevel().before;
            this.nextLevelXp= getLevel().total;
            const isWinner= this.checkIfWinner();
            if(isWinner && playerList.length>1){
                const coinsGained=Math.floor(Math.random()*playerList.length*1000); 
                playerStats.coins+=coinsGained
                console.log(`You got ${coinsGained} coins.`);
                editProfile({id: playerStats.id, coins: playerStats.coins});
                if(coinsGained>0){
                    this.add.image(700, h*0.75, 'esCoins').setOrigin(0.5);
                    this.add.text(750, h*0.75, `+${coinsGained}`);
                }
            }else{
                console.log('No coins gained');
            }
            playerStats.experience+=xpReward(this.compareLaps(gameStatus.track, this.bestLap, 0), this.compareLaps(gameStatus.track, this.bestLap, 1), this.compareLaps(gameStatus.track, this.bestLap, 2), true, isWinner);
            const rectFullXp= this.add.rectangle(200, h*0.75, 400, 30, 0xDCDCDC).setOrigin(0);
            this.nowXp= this.add.rectangle(200, h*0.75, this.playerXp*400/this.nextLevelXp, 30, 0xDAA520).setOrigin(0);
            this.updateXp= true;
            this.add.text(w*0.5, h*0.75-20, 'Xp points')
            console.log('player xp after call' ,playerStats.experience);
            homeBtn.setInteractive({cursor: 'pointer'})
            homeBtn.setDepth(5);
            homeTxt.setDepth(6);
        })
        homeBtn.on('pointerup', ()=>{
            gameStatus.player1.lap=0;
            gameStatus.player1.resistence=3000;
            gameStatus.player1.ready=false;
            pause=true
            gameStatus.player1.totalTime=0
            listOfObjectives[playerStats.objectivesLevel][2].status.completed=true;
            if(typeOfGame==='multiplayer'){
                saveReward();
                if(this.checkIfWinner()){
                    playerStats.wins++
                    addWin()
                }
                gameStatus.winner=undefined;
                gameStatus.gameOver=false;
                socket.emit('backHome')
                socket.disconnect();
                typeOfGame=undefined
                laps=[];
                this.scene.stop();
                this.scene.start('HomeScene')
            }
            
        })
    }

    update(){
        if(this.updateXp){
            while(this.playerXp !== playerStats.experience-getLevel().before){
                this.playerXp++;
                this.nowXp.setSize(this.playerXp*400/this.totalXpCalc, 30).setOrigin(0);
            }
        }
    }

    checkIfWinner(){
        if(gameStatus.winner.username===playerStats.username){
            console.log('winer true')
            return true;
        }else{
            console.log('winner false')
            return false
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
}