class Objectives extends Phaser.Scene{
    constructor(){
        super({key: 'Objectives'})
    }

    preload(){
        this.load.image('objBg', 'assets/gameOverBg.png');
        this.load.image('objCoins', 'assets/coins.png');
        this.load.image('objBack', 'assets/back_btn.png');
        this.load.image('objCoin', 'assets/coin.png');
    }

    create(){
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

        listOfObjectives.forEach((obj, i)=>{
            const boxName= `obj${i}Box`;
            const textName= `obj${i}Text`
            window[boxName]= this.add.rectangle(w*0.5,150+40*i, w*0.7, 30, 0xBBF0F3).setAlpha(0.7).setOrigin(0.5);
            window[textName]=this.add.text(w*0.5, 150+40*i, obj.name, {fontSize: 25, color: 'black'}).setOrigin(0.5);
            window[`id${i}`]=obj.id
        })     
        this.nbrLaps=[];
        this.checkObjectivesCompletion()
    }

    update(){
        this.playerCoins.setText(playerStats.coins)
    }

    checkObjectivesCompletion(){
         
        //second Objective
        const objective2= playerStats.objectivesCompleted.includes(listOfObjectives[1].id) ? true : false;
        if(!objective2){
            if(playerStats.races.length>1){
                listOfObjectives[1].status.completed=true
                obj1Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj1Box.on('pointerdown', ()=>{
                    playerStats.objectivesCompleted.push(id1);
                    for(let i=0; i<listOfObjectives[1].reward; i++){
                        this.coinTween(obj1Box.x, obj1Box.y, i*50)
                    }
                    addObjective({id: playerStats.id, objective: id1});
                    playerStats.coins+=listOfObjectives[1].reward;
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
        const objective3= playerStats.objectivesCompleted.includes(listOfObjectives[2].id) ? true : false;
        if(!objective3){
            if(listOfObjectives[2].status.completed){
                obj2Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj2Box.on('pointerdown', ()=>{
                    for(let i=0; i<listOfObjectives[2].reward; i++){
                        this.coinTween(obj2Box.x, obj2Box.y, i*50)
                    }
                    playerStats.objectivesCompleted.push(id2);
                    addObjective({id: playerStats.id, objective: id2});
                    playerStats.coins+=listOfObjectives[2].reward;
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
        const objective4= playerStats.objectivesCompleted.includes(listOfObjectives[3].id) ? true : false;
        if(!objective4){
            if(playerStats.wins>0){
                obj3Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj3Box.on('pointerdown', ()=>{
                    for(let i=0; i<listOfObjectives[3].reward; i++){
                        this.coinTween(obj3Box.x, obj3Box.y, i*50)
                    }
                    playerStats.objectivesCompleted.push(id3);
                    addObjective({id: playerStats.id, objective: id3});
                    playerStats.coins+=listOfObjectives[3].reward;
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
        const objective5= playerStats.objectivesCompleted.includes(listOfObjectives[4].id) ? true : false;
        if(!objective5){
            if(playerStats.races.length>=20){
                obj4Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj4Box.on('pointerdown', ()=>{
                    for(let i=0; i<listOfObjectives[4].reward; i++){
                        this.coinTween(obj4Box.x, obj4Box.y, i*50)
                    }
                    playerStats.objectivesCompleted.push(id4);
                    addObjective({id: playerStats.id, objective: id4});
                    playerStats.coins+=listOfObjectives[4].reward;
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
        const objective6= playerStats.objectivesCompleted.includes(listOfObjectives[5].id) ? true : false;
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
        console.log('this.nbrLaps', this.nbrLaps)
        if(!objective6){
            if(this.nbrLaps.length>=100){
                obj5Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj5Box.on('pointerdown', ()=>{
                    for(let i=0; i<listOfObjectives[5].reward; i++){
                        this.coinTween(obj5Box.x, obj5Box.y, i*50)
                    }
                    playerStats.objectivesCompleted.push(id5);
                    addObjective({id: playerStats.id, objective: id5});
                    playerStats.coins+=listOfObjectives[5].reward;
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
        const objective7= playerStats.objectivesCompleted.includes(listOfObjectives[6].id) ? true : false;
        if(!objective7){
            if(playerStats.garage.length>0){
                obj6Box.setFillStyle(0xFF4E00).setInteractive({cursor: 'pointer'});
                obj6Box.on('pointerdown', ()=>{
                    for(let i=0; i<listOfObjectives[6].reward; i++){
                        this.coinTween(obj6Box.x, obj6Box.y, i*50)
                    }
                    playerStats.objectivesCompleted.push(id6);
                    addObjective({id: playerStats.id, objective: id6});
                    playerStats.coins+=listOfObjectives[6].reward;
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
        const coin= this.add.image(x, y, 'objCoin')

        const tween= this.tweens.add({
            targets: coin,
            alpha: 1,
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
}