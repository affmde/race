let cursors;
let player;
let rectGoal;
let rectGoalEnd;
let pause= true
let timerInterval;
let timer={
    milisec: 0,
    sec: 0,
    min: 0
}

let laps=[]
class GameScene extends Phaser.Scene{
    constructor(){
        super({key: 'GameScene'})
    }

    preload(){
        
        this.load.image('tileset', 'assets/tileset.png');
        this.load.image('tileset2', 'assets/spritesheet_objects.png');
        this.load.tilemapTiledJSON('tilemap', `assets/${gameStatus.map}.json`);
        this.load.image('flag', 'assets/flag.png'), 
        this.load.image(gameStatus.player1.car, `assets/${gameStatus.player1.car}.png`);
        this.load.image('flagEndRace', 'assets/flagEndRace.png');
        cars.forEach(car=>{
            this.load.image(car.name, `assets/${car.path}.png`)
        })

        if(device!=='desktop'){
            const url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
            this.load.plugin('rexvirtualjoystickplugin', url, true);
            this.load.image('gameScenePs4CircleBtn', 'assets/ps4Circle.png');
            this.load.image('gameScenePs4CrossBtn', 'assets/ps4Cross.png')
        }
    }

    create(){
        this.stillRacing=true;
        const map = this.make.tilemap({ key: 'tilemap', tileWidth:32, tileHeight: 32 })
        const tileset = map.addTilesetImage('spritesheet_tiles', 'tileset');
        const tileset2= map.addTilesetImage('spritesheet_objects', 'tileset2');
        const grass= map.createLayer('grass', tileset2);
        const road= map.createLayer('Road', tileset);
        const walls= map.createLayer('walls', tileset);
        const objects= map.createLayer('objects', tileset2);
        this.totalLife= gameStatus.player1.resistence
        console.log('Track name: ', gameStatus.track)
        
        player= this.physics.add.sprite(startingPositions[gameStatus.player1.position].x, startingPositions[gameStatus.player1.position].y, gameStatus.player1.car)
        player.setMaxVelocity(330)
        player.body.useDamping = true;

        //create opponents
        this.opponentsGroup = this.add.group()
        opponents.forEach(opponent=>{
            console.log('opponent: ', opponent)
            this.opponent= this.opponentsGroup.create(startingPositions[opponent.position].x, startingPositions[opponent.position].y, opponent.stats.car)
            this.opponent.name= opponent.id
            console.log('thisOpponent:', this.opponent)
            this.physics.add.collider(this.opponent, player)
        })
        console.log('this.oppoentGroup' ,this.opponentsGroup)

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
            this.accelerationBtn= this.add.image(w-190, h-50, 'gameScenePs4CrossBtn').setOrigin(0.5).setInteractive().setScrollFactor(0).setAlpha(0.9);
            this.breakBtn= this.add.image(w-50, h-200, 'gameScenePs4CircleBtn').setOrigin(0.5).setInteractive().setScrollFactor(0).setAlpha(0.9);
        }

        //Create life bar
        this.lifeFullLife= this.add.rectangle(100, 10, 100, 15, 0xFF0000).setScrollFactor(0).setOrigin(0)
        this.lifeBar= this.add.rectangle(100,10,gameStatus.player1.resistence, 15, 0x7CFC00).setScrollFactor(0).setOrigin(0)

        //Cursor and keys
        cursors= this.input.keyboard.createCursorKeys();
        
        

        walls.setCollisionByExclusion([0, -1]);
        let col= this.physics.add.collider(player, walls, (pl, wall)=>{
            gameStatus.player1.resistence-=5;
            pl.setBounce(0.8);
        })
        //Cameras
        this.cameras.main.startFollow(player)
        this.cameras.main.setBounds(0,0, 6400, 2560);
        this.cameras.main.fadeIn(1000);
        this.cameras.main.setZoom(1);
        
        let lapTime=0;
        let timeAccumulator=0;
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
                        car: gameStatus.player1.car,
                        player: {
                            id: playerStats.id, 
                            name: playerStats.username
                        }
                    }
                    laps.push(lap);
                    saveLap(lap);
                    socket.emit('newLap', (laps[laps.length-1]))
                    const rect= this.add.rectangle(w*0.5, h*0.8, w*0.5, h*0.15, 0xFFFFFF).setAlpha(0.7).setScrollFactor(0)
                    const lapT= timeConverter(lapTime)
                    this.lapTimeText= this.add.text(w*0.5, h*0.8,lapT, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0)
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
                if(gameStatus.player1.lap<4){
                    rectGoal.body.enable=true;
                }
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
            console.log(checkpoint)
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

        //Socket actions

        socket.on('playerMoves', data=>{
            let op= this.opponentsGroup.getChildren().find(v => v.name === data.id);
            if(op){
                op.x= data.x;
                op.y= data.y;
                op.rotation= data.rotation;
            }
        })

        socket.on('newFastLap', (data)=>{
            console.log('fastest lap data', data)
            const rect = this.add.rectangle(0,40, w*0.4, h*0.5, 0xFFFFFF).setAlpha(0.8).setScrollFactor(0).setOrigin(0);
            const newLapTxt= this.add.text(0, 50,`${data.player.name} made a new lap:`, {fontSize: 20, color: 'black', wordWrap: { width: w*0.4, useAdvancedWrap: true }}).setScrollFactor(0).setOrigin(0);
            const timelap= timeConverter(data.laptime)
            const timeTxt= this.add.text(0,100, timelap, {fontSize: 20, color: 'black'}).setScrollFactor(0).setOrigin(0);

            this.time.addEvent({
                delay: 3000,
                loop: false,
                callback:()=>{
                    rect.destroy();
                    newLapTxt.destroy();
                    timeTxt.destroy();
                }
            })
        })

        socket.on('endRace', (data)=>{
            if(data.endRace){
                saveRace(laps)
                gameStatus.winner={
                    username: data.winner,
                    driver: data.driver
                }
                this.scene.stop();
                this.scene.start('EndScene')
            }
        })

        socket.on('playerEndRace', data=>{
            console.log('playerEndRace data: ' ,data)
            
            if(data.position===1){
                this.add.image(175, 60, 'flagEndRace').setOrigin(0.5).setScrollFactor(0);
                this.add.rectangle(0,70,350,350, 0x000000).setAlpha(0.5).setScrollFactor(0).setOrigin(0);
            }
            
            this.add.text(15,70+20*data.position, `${data.position} ${data.driver} - ${data.position===1 ? timeConverter(data.time) : "+"+timeConverter(data.time-data.bestLap)}`, {fontSize: 18}).setOrigin(0).setScrollFactor(0);
        })
        
        socket.on('gameOver', (data)=>{
            this.opponentsGroup.getChildren().forEach(op=>{
                if(op.name===data.id){
                    op.destroy()
                }
            })
        })

    }

    update(){

        if(!pause){
        this.checkControls()


        socket.emit('playerMoving', ({id: socket.id,x: player.x, y: player.y, rotation: player.rotation}))

        if(gameStatus.player1.lap===4){
            if(this.stillRacing){
                socket.emit('endGame', {
                    endRace: true, 
                    winner: playerStats.username, 
                    raceTime: this.elapsedTime, 
                    driver: playerStats.driver,
                    id: playerStats.id,
                    socketId: socket.id,
                    name: playerStats.username
                })
                this.add.image(w*0.5, 30, 'flagEndRace').setOrigin(0.5).setScrollFactor(0);
                this.add.text(w*0.5, 50, 'Wait for the other players to finish', {fontSize: 15}).setOrigin(0.5).setScrollFactor(0);
                this.stillRacing=false;
            }
        }
        
        
        
    }
    //Texts
    this.spritelayer1LapTxt.setText(`Lap: ${gameStatus.player1.lap <4 ? gameStatus.player1.lap : 3}/3`)

    if(this.i<=0){
        clearInterval(this.interval);
        this.countDownTxt.destroy()
        pause=false
        this.timerText.setAlpha(1)
    }

    //Update life bar
    this.lifeBar.destroy();
    this.lifeBar= this.add.rectangle(100,10,gameStatus.player1.resistence*100/this.totalLife, 15, 0x7CFC00).setScrollFactor(0).setOrigin(0)
    if(gameStatus.player1.resistence<=0){
        player.body.stop();
        if(laps.length>=1){
            addRace(laps)
        }
        gameStatus.player1.totalTime=this.elapsedTime;
        this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: ()=>{
                socket.emit('gameOver', {id: socket.id})
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
        const controls = new RaceControls(this, device, player, this.joyStick,this.accelerationBtn, this.breakBtn,this.pointer2, cursors);
    }

    

}