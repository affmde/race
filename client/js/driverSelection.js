class DriverSelection extends Phaser.Scene{
    constructor(){
        super({key: 'DriverSelection'})
    }

    preload(){
        drivers.forEach(driver=>{
            this.load.image(`ds${driver.path}`, `assets/characters/${driver.path}.png`);
        });
        this.load.image('dsBackBtn', 'assets/back_btn.png');
        this.load.image('dsBg', 'assets/gameOverBg.png');
        this.load.image('dsLeft', 'assets/arrowLeft.png');
        this.load.image('dsRight', 'assets/arrowRight.png');
        this.load.image('dsConfirm', 'assets/button_blue.png');
    }

    create(){
        this.i=0;
        this.add.image(0,0,'dsBg').setOrigin(0);
        this.add.text(w*0.5, h*0.1, 'Driver Selection', {fontSize: 35}).setOrigin(0.5);
        this.add.image(20,20, 'dsBackBtn').setOrigin(0).setInteractive({cursor: 'pointer'}).on('pointerdown', ()=>{
            this.scene.stop();
            this.scene.start('Profile');
        });

        this.driverPic= this.add.image(w*0.5, h*0.5, `ds${drivers[this.i].path}`).setOrigin(0.5);
        this.left= this.add.image(w*0.15, h*0.5, 'dsLeft').setOrigin(0.5).setInteractive({cursor: 'pointer'});
        this.right= this.add.image(w*0.85, h*0.5, 'dsRight').setOrigin(0.5).setInteractive({cursor: 'pointer'});
        this.confirm= this.add.image(w*0.5, h*0.9, 'dsConfirm').setOrigin(0.5).setInteractive({cursor: 'pointer'});
        this.add.text(w*0.5, h*0.9, 'Confirm', {fontSize: 25}).setOrigin(0.5);

        this.left.on('pointerdown', ()=>{
            this.left.setAlpha(0.6);
            this.i--;
            if(this.i<0){
                this.i=drivers.length-1
            }
        });
        this.left.on('pointerup', ()=>this.left.setAlpha(1));
        this.left.on('pointerout', ()=>this.left.setAlpha(1));

        this.right.on('pointerdown', ()=>{
            this.right.setAlpha(0.6)
            this.i++;
            if(this.i>drivers.length-1){
                this.i=0
            }
        });
        this.right.on('pointerup', ()=>this.right.setAlpha(1));
        this.right.on('pointerout', ()=>this.right.setAlpha(1));

        this.confirm.on('pointerdown', ()=>{
            playerStats.driver= drivers[this.i].path;
            editProfile({id: playerStats.id, driver: playerStats.driver})
            this.scene.stop();
            this.scene.start('Profile')
        });
        this.confirm.on('pointerover', ()=>this.confirm.setScale(1.05));
        this.confirm.on('pointerout', ()=>this.confirm.setScale(1))
    }

    update(){
        this.driverPic.setTexture(`ds${drivers[this.i].path}`);
    }
}