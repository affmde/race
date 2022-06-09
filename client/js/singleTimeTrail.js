class SingleTimeTrail extends Phaser.Scene{
    constructor(){
        super({key: 'SingleTimeTrail'})
    }

    preload(){
        this.load.image('tileset', 'assets/tileset.png');
        this.load.image('sttTileset2', 'assets/spritesheet_objects.png');
        this.load.tilemapTiledJSON('tilemap', `assets/${gameStatus.map}.json`);
        this.load.image('flag', 'assets/flag.png'), 
        this.load.image(gameStatus.player1.car.name, `assets/${gameStatus.player1.car.path}.png`);
        this.load.image('sttQuit', 'assets/quit.png');
        cars.forEach(car=>{
            this.load.image(car.name, `assets/${car.path}.png`)
        })
        if(device!=='desktop'){
            const url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
            this.load.plugin('rexvirtualjoystickplugin', url, true);
            this.load.image('singleTimeTrailPs4CircleBtn', 'assets/ps4Circle.png');
            this.load.image('singleTimeTrailPs4CrossBtn', 'assets/ps4Cross.png')
        }
    }

    create(){
        this.pause=true;
        const map = this.make.tilemap({ key: 'tilemap', tileWidth:32, tileHeight: 32 })
        const tileset = map.addTilesetImage('spritesheet_tiles', 'tileset');
        const tileset2= map.addTilesetImage('spritesheet_objects', 'sttTileset2');
        const grass= map.createLayer('grass', tileset2);
        const road= map.createLayer('Road', tileset);
        const walls= map.createLayer('walls', tileset);
        const objects= map.createLayer('objects', tileset2);
        this.totalLife= gameStatus.player1.resistence
        this.laps=[];
        let lapTime=0;
        let timeAccumulator=0;

        //Create player
        player= this.physics.add.sprite(1750, 2048, gameStatus.player1.car.name)
        player.setMaxVelocity(gameStatus.player1.car.maxSpeed)
        player.body.useDamping = true;
        this.remainingResistence= gameStatus.player1.car.resistence

        //Create joystick
        if(device!=='desktop'){
            this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 100,
                y: h-100,
                radius: 100,
                base: this.add.circle(0, 0, 50, 0x888888).setAlpha(0.8),
                thumb: this.add.circle(0, 0, 25, 0xcccccc).setAlpha(0.8),
                dir: '4dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                forceMin: 16,
                enable: true
            })
            this.pointer2= this.input.addPointer()
            this.pointer3= this.input.addPointer()
            this.accelerationBtn= this.add.image(w-190, h-75, 'singleTimeTrailPs4CrossBtn').setOrigin(0.5).setInteractive().setScrollFactor(0).setAlpha(0.7);
            this.breakBtn= this.add.image(w-80, h-210, 'singleTimeTrailPs4CircleBtn').setOrigin(0.5).setInteractive().setScrollFactor(0).setAlpha(0.7);
        }

        //Quit button
        const quitBtn= this.add.image(w*0.9, h*0.15, 'sttQuit').setOrigin(0.5).setScrollFactor(0).setInteractive({cursor: 'pointer'});
        quitBtn.on('pointerdown', ()=>{
                this.scene.stop();
                this.scene.start('GameOver')
        })
        

        //Create life bar
        this.lifeFullLife= this.add.rectangle(100, 10, 100, 15, 0xFF0000).setScrollFactor(0).setOrigin(0)
        this.lifeBar= this.add.rectangle(100,10,this.remainingResistence, 15, 0x7CFC00).setScrollFactor(0).setOrigin(0)

        //Cursor and keys
        cursors= this.input.keyboard.createCursorKeys();
        
        

        walls.setCollisionByExclusion([0, -1]);
        let col= this.physics.add.collider(player, walls, (pl, wall)=>{
            this.remainingResistence-=5;
            pl.setBounce(0.8);
        })
        //Cameras
        this.cameras.main.startFollow(player)
        this.cameras.main.setBounds(0,0, 6400, 2560);
        this.cameras.main.fadeIn(1000);
        this.cameras.main.setZoom(1);
        
        //Create  goalLine

        map.getObjectLayer('goal').objects.forEach(goal=>{
            rectGoal= this.add.rectangle(goal.x, goal.y, 0.000005, 255, 0x000000).setOrigin(0);
            rectGoalEnd= this.add.rectangle(3050, 1984, 0.000005, 255, 0x000000).setOrigin(0);
            this.physics.add.existing(rectGoal);
            this.physics.add.existing(rectGoalEnd);
            //Goals Overlap
            this.physics.add.overlap(player, rectGoal, ()=>{
                if(checkpoints.checkpoint3){
                
                gameStatus.player1.lap++
                rectGoal.body.enable=false
                lapTime=this.elapsedTime-timeAccumulator.toFixed(3);
                timeAccumulator+=lapTime;
                //Control lap stats
                if(gameStatus.player1.lap>1){
                    const lap={
                        track: gameStatus.track,
                        lap: gameStatus.player1.lap-1, 
                        time: lapTime, 
                        car: gameStatus.player1.car.name,
                        player: {
                            name: playerStats.username,
                            id: playerStats.id
                        }
                    }
                    this.laps.push(lap);
                    saveRace(lap);
                    saveLap(lap);
                    //tranform time in readble time
                    let min= Math.floor(lapTime/ 60)
                    let sec= Math.floor(lapTime) - (60 * min)
                    const milisec= (lapTime - Math.floor(lapTime))*1000
                    let miliseconds= Math.floor(milisec)
                    const rect= this.add.rectangle(w*0.5, h*0.8, w*0.5, h*0.15, 0xFFFFFF).setAlpha(0.7).setScrollFactor(0)
                    this.lapTimeText= this.add.text(w*0.5, h*0.8,`Lap time: ${min<10? '0'+min : min}:${sec<10? '0'+sec :sec}:${miliseconds}`, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0)
                    this.showLapTime= this.time.addEvent({
                        delay: 4000,
                        callback: ()=>{
                            this.lapTimeText.destroy();
                            rect.destroy()
                        },
                        loop: false
                    })
                }
            }
            //Reorganize the checkpoints for next lap
            checkpoints.checkpoint1=false;
            checkpoints.checkpoint2=false;
            checkpoints.checkpoint3=false;
            })
            this.physics.add.overlap(player, rectGoalEnd, ()=>{
                rectGoal.body.enable=true;
            })
        
        })

        //Texts
        this.spritelayer1LapTxt= this.add.text(10,10,'Lap: 0').setOrigin(0).setScrollFactor(0);
        this.timerText= this.add.text(w*0.8, 10, 'Time: 0:0:0').setScrollFactor(0)

        //Timer
        this.startTime= new Date();
        console.log(this.startTime)
        
        this.gameTimer= this.time.addEvent({
            delay: 100,
            callback: ()=>{
                const currentTime= new Date();
                const timeDifference= this.startTime.getTime() - currentTime.getTime()
                this.elapsedTime= Math.abs(timeDifference/1000)-3;
                timer.min= Math.floor(this.elapsedTime/ 60)
                timer.sec= Math.floor(this.elapsedTime) - (60 * timer.min)
                const milisec= (this.elapsedTime - Math.floor(this.elapsedTime))*1000
                timer.milisec= Math.floor(milisec)
                this.timerText.setText(`Time: ${timer.min<10? '0'+timer.min : timer.min}:${timer.sec<10? '0'+timer.sec : timer.sec}:${timer.milisec}`)
            },
            loop: true
        })
        
        //Flag
        this.flag= this.add.image(0,0,'flag').setOrigin(0).setScrollFactor(0).setAlpha(0)
    
        //Create countDown
        this.countDown()
        
        //Create Checkpoints
        let checkpoints={
            checkpoint1: false,
            checkpoint2: false,
            checkpoint3: true,
        }
        map.getObjectLayer('checkpoints').objects.forEach((checkpoint, i)=>{
            this.checkpointRect= this.add.rectangle(checkpoint.x, checkpoint.y, checkpoint.width, checkpoint.height, 0x000000).setOrigin(0).setAlpha(0.000001);
            this.physics.add.existing(this.checkpointRect);
            //Checkpoints overlap
            this.physics.add.overlap(this.checkpointRect, player, (checkpt, pl)=>{
                if(i===0){
                    checkpoints.checkpoint1=true;
                }else if(i===1){
                    if(checkpoints.checkpoint1){
                        checkpoints.checkpoint2=true;
                    }
                }else if(i===2){
                    if(checkpoints.checkpoint2){
                        checkpoints.checkpoint3=true;
                    }
                }
            })
        })

    }

    update(){
        
        if(!this.pause){
        this.checkControls()
        
        if(gameStatus.player1.lap>=2){
            this.scene.stop();
            this.scene.start('SingleEndScene', {lap: this.laps})
        }
        
    }

    //Texts
    this.spritelayer1LapTxt.setText(`Lap: ${gameStatus.player1.lap}/1`)

    if(this.i<=0){
        clearInterval(this.interval);
        this.countDownTxt.destroy()
        this.pause=false
        this.timerText.setAlpha(1)
    }

    //Update life bar
    
    this.lifeBar.setSize(this.remainingResistence*100/this.totalLife, 15);
    if(this.remainingResistence<=0){
        player.body.stop();
        gameStatus.player1.totalTime=this.elapsedTime;
        this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: ()=>{
                this.scene.stop();
                this.scene.start('GameOver')
            }
        })
    }
}

    countDown(){
        this.i= 3
        this.countDownTxt= this.add.text(w*0.5,h*0.5, this.i, {fontSize: 40}).setOrigin(0.5).setScrollFactor(0);
        this.timerText.setAlpha(0);
        this.interval= setInterval(()=>{
            this.i--
            this.countDownTxt.setText(this.i)
        },1000)
    }

    checkControls(){
        const controls = new RaceControls(this, device, player, this.joyStick,this.accelerationBtn, this.breakBtn,this.pointer2, cursors, gameStatus.player1.car);
    }

}