class RaceFull extends Phaser.Scene{
    constructor(){
        super({key: 'RaceFull'})
    }

    preload(){
        this.load.image('bg2', 'assets/bg2.png');
        this.load.image('bgBrown', 'assets/background_brown.png');
        this.load.image('btnYellow', 'assets/button_yellow.png');
    }

    create(){
        const bg= this.add.image(0,0,'bg2').setOrigin(0).setAlpha(0.7);
        const rect= this.add.image(w*0.5, h*0.5, 'bgBrown').setOrigin(0.5).setAlpha(0.5)
        const Txt= this.add.text(w*0.5, h*0.5, 'Room is full or race is going on. Try again', {fontSize: 35, lineSpacing: 15, wordWrap: { width: 500 }}).setOrigin(0.5)
        
        
        const returnBtn= this.add.image(w*0.5, h*0.8, 'btnYellow').setOrigin(0.5).setInteractive();
        this.returnBtn= this.add.text(w*0.5, h*0.8, 'Return', {fontSize: 30}).setOrigin(0.5);
        returnBtn.on('pointerdown', ()=>{
            this.scene.stop();
            this.scene.start('CarSelection')
        })

    }

    update(){
        
    }
}