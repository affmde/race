class Objectives extends Phaser.Scene{
    constructor(){
        super({key: 'Objectives'})
    }

    preload(){
        this.load.image('objBg', 'assets/gameOverBg.png');
        this.load.image('objCoins', 'assets/coins.png');
        this.load.image('objBack', 'assets/back_btn.png');
        this.load.image('objCoin', 'assets/coin.png');
        this.load.image('objExtraBtn', 'assets/blue_button04.png');
        this.load.image('objChest', 'assets/chest.png');
        this.load.atlas('treasure_chest', 'assets/animations/treasure_chest.png', 'assets/animations/treasure_chest_atlas.json');
        this.load.animation('treasure_anim', 'assets/animations/treasure_chest_anim.json');
    }

    create(){
        this.objectivesLevel= playerStats.objectivesLevel
        this.add.image(0,0,'objBg').setOrigin(0);
        const title= this.add.text(w*0.5, h*0.05, 'Objectives', {fontSize: 35}).setOrigin(0.5);
        this.add.image(w-200, h*0.05, 'objCoins').setOrigin(0.5);
        this.playerCoins= this.add.text(w-160, h*0.05, playerStats.coins, {fontSize: 25}).setOrigin(0, 0.5)
        const back= this.add.image(20,20, 'objBack').setOrigin(0).setScale(0.6).setInteractive({cursor: 'pointer'});
        

        back.on('pointerdown', ()=>{
            this.scene.stop();
            this.scene.start('HomeScene');
        })

        //Objectives
        this.obj0=false;
        this.obj1=false;
        this.obj2= false;
        this.obj3=false;
        this.obj4=false;
        this.obj5=false;
        this.obj6=false;

        listOfObjectives[this.objectivesLevel].forEach((obj, i)=>{
            const boxName= `obj${i}Box`;
            const textName= `obj${i}Text`
            window[boxName]= this.add.rectangle(w*0.5,150+40*i, w*0.7, 30, 0xBBF0F3).setAlpha(0.7).setOrigin(0.5);
            window[textName]=this.add.text(w*0.5, 150+40*i, obj.name, {fontSize: 25, color: 'black'}).setOrigin(0.5).setDepth(5);
            window[`id${i}`]=obj.id
        })     
        this.nbrLaps=[];
        this.checkObjectivesCompletion();
        this.chest= this.add.sprite(w*0.5, h*0.6, 'objChest').setOrigin(0.5).setScale(2).setInteractive({cursor: 'pointer'}).setAlpha(0);
        this.chest.on('pointerdown', ()=>{
            this.extraBox()
        })
        
    }

    update(){
        this.playerCoins.setText(playerStats.coins);
        const allObjec= listOfObjectives[this.objectivesLevel].every(obj=>{
            const completed= playerStats.objectivesCompleted.includes(obj);
            if(completed){
                this.chest.setAlpha(1)
            }
        })
        
    }

    checkObjectivesCompletion(){

        //First objective
        if(listOfObjectives[this.objectivesLevel][0].status.completed){
            obj0Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
            obj0Box.on('pointerdown', ()=>{
                playerStats.objectivesCompleted.push(id0);
                for(let i=0; i<listOfObjectives[this.objectivesLevel][0].reward; i++){
                    this.coinTween(obj0Box.x, obj0Box.y, i*50)
                }
                addObjective({id: playerStats.id, objective: id0});
                playerStats.coins+=listOfObjectives[this.objectivesLevel][0].reward;
                editProfile({id: playerStats.id, coins: playerStats.coins});
                obj0Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
                obj0Text.setAlpha(0.5).setText('Completed')
                console.log('player obj compl: ', playerStats.objectivesCompleted)
                listOfObjectives[this.objectivesLevel][0].status.received=true
            })
        }else if(listOfObjectives[this.objectivesLevel][0].status.received){
            obj0Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
            obj0Text.setAlpha(0.5).setText('Completed')
        }else{
            return
        }
         
        //second Objective
        const objective2= playerStats.objectivesCompleted.includes(listOfObjectives[this.objectivesLevel][1].id) ? true : false;
        if(!objective2){
            if(playerStats.races.length>listOfObjectives[this.objectivesLevel][1].condition){
                listOfObjectives[this.objectivesLevel][1].status.completed=true
                obj1Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj1Box.on('pointerdown', ()=>{
                    const repeat= listOfObjectives[this.objectivesLevel][1].reward >50 ? 50 : listOfObjectives[this.objectivesLevel][1].reward
                    playerStats.objectivesCompleted.push(id1);
                    for(let i=0; i<repeat; i++){
                        this.coinTween(obj1Box.x, obj1Box.y, i*50)
                    }
                    addObjective({id: playerStats.id, objective: id1});
                    playerStats.coins+=listOfObjectives[this.objectivesLevel][1].reward;
                    editProfile({id: playerStats.id, coins: playerStats.coins});
                    obj1Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
                    obj1Text.setAlpha(0.5).setText('Completed')
                    console.log('player obj compl: ', playerStats.objectivesCompleted)
                })
            }
        }else{
            obj1Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
            obj1Text.setAlpha(0.5).setText('Completed')
        }



        //Third Objective
        const objective3= playerStats.objectivesCompleted.includes(listOfObjectives[this.objectivesLevel][2].id) ? true : false;
        if(!objective3){
            if(listOfObjectives[this.objectivesLevel][2].status.completed){
                obj2Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj2Box.on('pointerdown', ()=>{
                    const repeat= listOfObjectives[this.objectivesLevel][2].reward >50 ? 50 : listOfObjectives[this.objectivesLevel][2].reward
                    for(let i=0; i<repeat; i++){
                        this.coinTween(obj2Box.x, obj2Box.y, i*50)
                    }
                    playerStats.objectivesCompleted.push(id2);
                    addObjective({id: playerStats.id, objective: id2});
                    playerStats.coins+=listOfObjectives[this.objectivesLevel][2].reward;
                    editProfile({id: playerStats.id, coins: playerStats.coins});
                    obj2Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
                    obj2Text.setAlpha(0.5)
                    console.log('player obj compl: ', playerStats.objectivesCompleted)
                })
            }
        }else{
            obj2Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
            obj2Text.setAlpha(0.5).setText('Completed')
        }


        //FOurth Objective
        const objective4= playerStats.objectivesCompleted.includes(listOfObjectives[this.objectivesLevel][3].id) ? true : false;
        if(!objective4){
            const rect4=this.add.rectangle(120, obj3Box.y, playerStats.wins*560/listOfObjectives[this.objectivesLevel][3].condition, 30, 0xe6add8).setOrigin(0, 0.5).setAlpha(0.7);
            if(playerStats.wins>listOfObjectives[this.objectivesLevel][3].condition){
                obj3Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj3Box.on('pointerdown', ()=>{
                    const repeat= listOfObjectives[this.objectivesLevel][3].reward >50 ? 50 : listOfObjectives[this.objectivesLevel][3].reward
                    for(let i=0; i<repeat; i++){
                        this.coinTween(obj3Box.x, obj3Box.y, i*50)
                    }
                    playerStats.objectivesCompleted.push(id3);
                    addObjective({id: playerStats.id, objective: id3});
                    playerStats.coins+=listOfObjectives[this.objectivesLevel][3].reward;
                    editProfile({id: playerStats.id, coins: playerStats.coins});
                    obj3Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
                    obj3Text.setAlpha(0.5)
                    console.log('player obj compl: ', playerStats.objectivesCompleted)
                })
            }
        }else{
            obj3Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
            obj3Text.setAlpha(0.5).setText('Completed')
        }


        //Fifth Objective
        const objective5= playerStats.objectivesCompleted.includes(listOfObjectives[this.objectivesLevel][4].id) ? true : false;
        if(!objective5){
            const rect5=this.add.rectangle(120, obj4Box.y, playerStats.races.length*560/listOfObjectives[this.objectivesLevel][4].condition, 30, 0xe6add8).setOrigin(0, 0.5).setAlpha(0.7);
            if(playerStats.races.length>=listOfObjectives[this.objectivesLevel][4].condition){
                obj4Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj4Box.on('pointerdown', ()=>{
                    const repeat= listOfObjectives[this.objectivesLevel][4].reward >50 ? 50 : listOfObjectives[this.objectivesLevel][4].reward
                    for(let i=0; i<repeat; i++){
                        this.coinTween(obj4Box.x, obj4Box.y, i*50)
                    }
                    playerStats.objectivesCompleted.push(id4);
                    addObjective({id: playerStats.id, objective: id4});
                    playerStats.coins+=listOfObjectives[this.objectivesLevel][4].reward;
                    editProfile({id: playerStats.id, coins: playerStats.coins});
                    obj4Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
                    obj4Text.setAlpha(0.5)
                    console.log('player obj compl: ', playerStats.objectivesCompleted)
                })
            }
        }else{
            obj4Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
            obj4Text.setAlpha(0.5).setText('Completed')
        }


        //Sixth objective
        const objective6= playerStats.objectivesCompleted.includes(listOfObjectives[this.objectivesLevel][5].id) ? true : false;
        lapsByTrack.lastDiamond.forEach(lap=>{
            if(lap.username===playerStats.username){
                this.nbrLaps.push(lap)
            }
        })
        lapsByTrack.fastLaine.forEach(lap=>{
            if(lap.username===playerStats.username){
                this.nbrLaps.push(lap)
            }
        })
    
        const rect6=this.add.rectangle(120, obj5Box.y, this.nbrLaps.length*560/listOfObjectives[this.objectivesLevel][5].condition, 30, 0xe6add8).setOrigin(0, 0.5).setAlpha(0.7);
        if(!objective6){
            if(this.nbrLaps.length>=listOfObjectives[this.objectivesLevel][5].condition){
                obj5Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj5Box.on('pointerdown', ()=>{
                    const repeat= listOfObjectives[this.objectivesLevel][5].reward >50 ? 50 : listOfObjectives[this.objectivesLevel][5].reward
                    for(let i=0; i<repeat; i++){
                        this.coinTween(obj5Box.x, obj5Box.y, i*50)
                    }
                    playerStats.objectivesCompleted.push(id5);
                    addObjective({id: playerStats.id, objective: id5});
                    playerStats.coins+=listOfObjectives[this.objectivesLevel][5].reward;
                    editProfile({id: playerStats.id, coins: playerStats.coins});
                    obj5Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
                    obj5Text.setAlpha(0.5)
                    console.log('player obj compl: ', playerStats.objectivesCompleted)
                })
            }
        }else{
            obj5Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
            obj5Text.setAlpha(0.5).setText('Completed')
        }


        //7th Objective
        const objective7= playerStats.objectivesCompleted.includes(listOfObjectives[this.objectivesLevel][6].id) ? true : false;
        if(!objective7){
            if(playerStats.garage.length>listOfObjectives[this.objectivesLevel][6].condition){
                obj6Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj6Box.on('pointerdown', ()=>{
                    const repeat= listOfObjectives[this.objectivesLevel][6].reward >50 ? 50 : listOfObjectives[this.objectivesLevel][6].reward
                    for(let i=0; i<repeat; i++){
                        this.coinTween(obj6Box.x, obj6Box.y, i*50)
                    }
                    playerStats.objectivesCompleted.push(id6);
                    addObjective({id: playerStats.id, objective: id6});
                    playerStats.coins+=listOfObjectives[this.objectivesLevel][6].reward;
                    editProfile({id: playerStats.id, coins: playerStats.coins});
                    obj6Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
                    obj6Text.setAlpha(0.5)
                    console.log('player obj compl: ', playerStats.objectivesCompleted)
                })
            }
        }else{
            obj6Box.setFillStyle(0x788CB6).disableInteractive().setAlpha(1);
            obj6Text.setAlpha(0.5).setText('Completed')
        }

    }


    coinTween(x, y, del){
        const coin= this.add.image(x, y, 'objCoin').setAlpha(0)

        const tween= this.tweens.add({
            targets: coin,
            alpha: { from: 0, to: 1 },
            ease: 'Linear',
            duration: 1000,
            repeat: 0,
            yoyo: false,
            x: `+=${Math.random()*200-100}`,
            y:`+=${-(50+Math.random()*100)}`,
            onComplete: ()=>{
                coin.destroy();
            },
            delay: del
        })
    }

    extraBox(){
        
        this.chest.anims.play({
            key: 'treasure_chest_open',
            repeat: 0,
            hideOnComplete: true
        })
        for(let i= 0; i<40;i++){
            this.coinTween(this.chest.x, this.chest.y, 1000+i*0.3)
        }
        playerStats.coins+=3000;
        playerStats.experience+=500;
        saveReward();
        this.objectivesLevel++
        if(this.objectivesLevel>listOfObjectives.length){
            this.objectivesLevel=listOfObjectives.length-1
        }
        playerStats.objectivesLevel++
        if(playerStats.objectivesLevel>listOfObjectives.length){
            playerStats.objectivesLevel=listOfObjectives.length-1
        }
        editProfile({id: playerStats.id, objectivesLevel: playerStats.objectivesLevel})
    }
}