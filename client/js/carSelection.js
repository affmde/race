class CarSelection extends Phaser.Scene{
    constructor(){
        super({key: 'CarSelection'})
    }

    preload(){
        this.load.image('carSelectionBg', 'assets/carSelectionBg.png');
        this.load.image('bgBlue', 'assets/background_blue.png');
        this.load.image('arrowRight', 'assets/arrowRight.png');
        this.load.image('arrowLeft', 'assets/arrowLeft.png');
        this.load.image('confirmBg', 'assets/iceBlueCircular.png');
        this.load.image('carSelectBackBtn', 'assets/back_btn.png');
        this.load.image('carSelectLogoutBtn', 'assets/logout_button.png');
        cars.forEach(car=>{
            this.load.image(car.name, `assets/${car.path}.png`)
        })
    }

    create(){
        this.i=0
        const bg= this.add.image(0,0,'carSelectionBg').setOrigin(0).setAlpha(0.7);
        const rect= this.add.image(w*0.5, h*0.5, 'bgBlue').setOrigin(0.5).setAlpha(0.5)
        const right= this.add.image(w*0.8, h*0.5, 'arrowRight').setOrigin(0.5).setInteractive({cursor: "pointer" });
        const left= this.add.image(w*0.2, h*0.5, 'arrowLeft' ).setOrigin(0.5).setInteractive({cursor: "pointer" });
        const confirmBg= this.add.image(w*0.5, h*0.8, 'confirmBg').setOrigin(0.5).setAlpha(0.8).setInteractive({cursor: "pointer" });
        const confirm= this.add.text(w*0.5, h*0.8, 'Advance', {fontSize: 25}).setOrigin(0.5);
        const backBtn= this.add.image(20, 20, 'carSelectBackBtn').setOrigin(0).setInteractive({cursor: 'pointer'});
        const logoutBtn= this.add.image(w-20, 20, 'carSelectLogoutBtn').setOrigin(1, 0).setInteractive({cursor: 'pointer'});
        backBtn.on('pointerdown', ()=>{
            backBtn.setAlpha(0.6);
        })
        backBtn.on('pointerup', ()=>{
            backBtn.setAlpha(1);
            this.scene.stop();
            this.scene.start('HomeScene')
        })
        backBtn.on('pointerout', ()=>backBtn.setAlpha(1))

        logoutBtn.on('pointerdown', ()=>{
            logoutBtn.setAlpha(0.6);
        })
        logoutBtn.on('pointerup', ()=>{
            logoutBtn.setAlpha(1);
            user={
                token: undefined
            }
            this.scene.stop();
            this.scene.start('LoginScene')
        })
        logoutBtn.on('pointerout', ()=>logoutBtn.setAlpha(1))
        
        right.on('pointerdown', ()=>{
            right.setAlpha(0.6)
            this.i++;
            if(this.i>playerStats.garage.length-1){
                this.i=0
            }
        });
        right.on('pointerup', ()=>right.setAlpha(1));
        right.on('pointerout', ()=>right.setAlpha(1))
        left.on('pointerdown', ()=>{
            left.setAlpha(0.6);
            this.i--;
            if(this.i<0){
                this.i=playerStats.garage-1
            }
        });
        left.on('pointerup', ()=>left.setAlpha(1));
        left.on('pointerout', ()=>left.setAlpha(1))

        confirmBg.on('pointerdown', ()=>{
            confirmBg.setAlpha(0.4);
            gameStatus.player1.car=playerStats.garage[this.i];
            
            if(typeOfGame==='multiplayer'){
                this.scene.stop();
                this.scene.start('WaitingRoom')
            }else if(typeOfGame==='singlePlayer'){
                this.scene.stop();
                this.scene.start('TrackSelection')
            }
        })
        confirmBg.on('pointerup', ()=>confirmBg.setAlpha(0.8));
        confirmBg.on('pointerout', ()=>confirmBg.setAlpha(0.8));

        this.carName= this.add.text(w*0.5, h*0.15, playerStats.garage[this.i].name, {fontSize: 30}).setOrigin(0.5, 0)
        this.carPic= this.add.image(w*0.5, h*0.5, playerStats.garage[this.i].name).setScale(3)

    }

    update(){
        this.carName.setText(playerStats.garage[this.i].name);
        this.carPic.setTexture(playerStats.garage[this.i].name);
    }
}