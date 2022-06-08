class TrackSelection extends Phaser.Scene{
    constructor(){
        super({key: 'TrackSelection'})
    }

    preload(){
        this.load.image('trackSelectionBg', 'assets/gameOverBg.png');
        tracks.forEach(track=>{
            this.load.image(track.path, `assets/tracks/${track.path}.png`)
        })
        this.load.image('trackSelectionLeft', 'assets/arrowLeft.png');
        this.load.image('trackSelectionRight', 'assets/arrowRight.png');
        this.load.image('trackSelectionConfirm', 'assets/blue_button04.png');
        this.load.image('trackSelectionBack', 'assets/back_btn.png');
    }

    create(){
        this.i=0;
        this.add.image(0,0,'trackSelectionBg').setOrigin(0);
        const title= this.add.text(w*0.5, h*0.1, 'Track selection', {fontSize: 40}).setOrigin(0.5);
        const leftArrow= this.add.image(w*0.15, h*0.5, 'trackSelectionLeft').setInteractive({cursor: 'pointer'}).setOrigin(0.5);
        const rightArrow= this.add.image(w*0.85, h*0.5, 'trackSelectionRight').setInteractive({cursor: 'pointer'}).setOrigin(0.5);
        this.trackName= this.add.text(w*0.5, h*0.28, tracks[this.i].name, {fontSize: 28}).setOrigin(0.5);
        this.trackPic= this.add.image(w*0.5, h*0.5, tracks[this.i].path).setOrigin(0.5);
        const backBtn= this.add.image(20, 20, 'trackSelectionBack').setOrigin(0).setInteractive({cursor: 'pointer'});

        const topTimes= this.add.text(w*0.5, h*0.7, 'Top Times', {fontSize: 30}).setOrigin(0.5);
        this.score1= this.add.text(w*0.5, h*0.75+0*20, `0 - 0`).setOrigin(0.5);
        this.score2= this.add.text(w*0.5, h*0.75+1*20, `0 - 0`).setOrigin(0.5);
        this.score3= this.add.text(w*0.5, h*0.75+2*20, `0 - 0`).setOrigin(0.5);
        
        rightArrow.on('pointerdown', ()=>{
            rightArrow.setAlpha(0.6)
            this.i++;
            if(this.i>tracks.length-1){
                this.i=0
            }
        });
        rightArrow.on('pointerup', ()=>rightArrow.setAlpha(1));
        rightArrow.on('pointerout', ()=>rightArrow.setAlpha(1))
        leftArrow.on('pointerdown', ()=>{
            leftArrow.setAlpha(0.6);
            this.i--;
            if(this.i<0){
                this.i=tracks.length-1
            }
        });
        leftArrow.on('pointerup', ()=>leftArrow.setAlpha(1));
        leftArrow.on('pointerout', ()=>leftArrow.setAlpha(1));

        const confirmBtn= this.add.image(w*0.5, h*0.95, 'trackSelectionConfirm').setOrigin(0.5).setInteractive({cursor: 'pointer'});
        const confirmTxt= this.add.text(w*0.5, h*0.95, 'Continue', {fontSize: 30}).setOrigin(0.5);
        confirmBtn.on('pointerdown', ()=>{
            gameStatus.map=tracks[this.i].map;
            gameStatus.track= tracks[this.i].name
            this.scene.stop();
            this.scene.start('SingleTimeTrail')
        })

        backBtn.on('pointerdown', ()=>{
            backBtn.setAlpha(0.6);
        })
        backBtn.on('pointerup', ()=>{
            backBtn.setAlpha(1);
            this.scene.stop();
            this.scene.start('CarSelection')
        })
        backBtn.on('pointerout', ()=>backBtn.setAlpha(1))
    }
    

    update(){
        this.trackName.setText(tracks[this.i].name);
        this.trackPic.setTexture(tracks[this.i].path);

        this.showBestScores(tracks[this.i].name);
    }

    showBestScores(track){
        if(track==='Fast Lain'){
            fastLainScores.forEach((score, i)=>{
                if(i===0){
                    this.score1.setText(`${timeConverter(score.time)} - ${score.username}`)
                }else if(i===1){
                    this.score2.setText(`${timeConverter(score.time)} - ${score.username}`)
                }else if(i===2){
                    this.score3.setText(`${timeConverter(score.time)} - ${score.username}`)
                }
            })
        }else if(track=== 'Last Diamond'){
            lastDiamondScores.forEach((score, i)=>{
                if(i===0){
                    this.score1.setText(`${timeConverter(score.time)} - ${score.username}`)
                }else if(i===1){
                    this.score2.setText(`${timeConverter(score.time)} - ${score.username}`)
                }else if(i===2){
                    this.score3.setText(`${timeConverter(score.time)} - ${score.username}`)
                }else{
                    return
                }
            })
        }
    }
}