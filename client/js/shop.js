class Shop extends Phaser.Scene{
    constructor(){
        super({key: 'Shop'})
    }

    preload(){
        this.load.image('shopBg', 'assets/gameOverBg.png');
        cars.forEach(car=>{
            this.load.image(`shop${car.path}`, `assets/${car.path}.png`)
        });
        this.load.image('shopBack', 'assets/back_btn.png');
        this.load.image('shopLeft', 'assets/arrowLeft.png');
        this.load.image('shopRight', 'assets/arrowRight.png');
        this.load.image('shopBuyBtn', 'assets/button_blue.png');
        this.load.image('shopCoins', 'assets/coins.png');
        this.load.image('shopLock', 'assets/lock.png');
    }

    create(){
        this.i=0;
        this.add.image(0,0,'shopBg').setOrigin(0);
        const title= this.add.text(w*0.5, h*0.05, 'Shop', {fontSize: 35}).setOrigin(0.5);
        this.add.image(w-200, h*0.05, 'shopCoins').setOrigin(0.5);
        this.playerCoins= this.add.text(w-160, h*0.05, playerStats.coins, {fontSize: 25}).setOrigin(0, 0.5)
        const back= this.add.image(20,20, 'shopBack').setOrigin(0).setScale(0.6).setInteractive({cursor: 'pointer'});
        const left= this.add.image(w*0.55, h*0.5, 'shopLeft').setOrigin(0.5).setScale(0.7).setInteractive({cursor: 'pointer'});
        const right= this.add.image(w*0.95, h*0.5, 'shopRight').setOrigin(0.5).setScale(0.7).setInteractive({cursor: 'pointer'});
        this.confirmBtn= this.add.image(w*0.75, h*0.9, 'shopBuyBtn').setOrigin(0.5).setScale(0.4).setInteractive({cursor: 'pointer'});
        this.buyTxt= this.add.text(w*0.75, h*0.9, 'Buy', {fontSize: 20}).setOrigin(0.5);
        this.carName= this.add.text(w*0.75, h*0.2, cars[this.i].name, {fontSize: 25}).setOrigin(0.5);
        this.carPic= this.add.image(w*0.75, h*0.5, `shop${cars[this.i].path}`).setOrigin(0.5).setScale(3.5);
        this.carPrice= this.add.text(w*0.75, h*0.75, cars[this.i].price, {fontSize: 25}).setOrigin(0.5);
        console.log(this.carPrice);
        this.add.image(this.carPrice.x-60, this.carPrice.y, 'shopCoins').setOrigin(0.5);

        //Left Side

        this.add.text(w*0.25, h*0.3, 'Stats', {fontSize: 25}).setOrigin(0.5);
        this.add.text(20, h*0.4, 'Speed', {fontSize: 18}).setOrigin(0);
        this.add.rectangle(100, h*0.4, 200, 15, 0xa9a9a9).setOrigin(0);
        this.speed= this.add.rectangle(100,h*0.4, cars[this.i].maxSpeed*200/500, 15, 0xAA4A44 ).setOrigin(0);

        this.add.text(20, h*0.45, 'Acc', {fontSize: 18}).setOrigin(0);
        this.add.rectangle(100, h*0.45, 200, 15, 0xa9a9a9).setOrigin(0);
        this.acceleration= this.add.rectangle(100,h*0.45, cars[this.i].acceleration*200/500, 15, 0xAA4A44 ).setOrigin(0);

        this.add.text(20, h*0.5, 'Break', {fontSize: 18}).setOrigin(0);
        this.add.rectangle(100, h*0.5, 200, 15, 0xa9a9a9).setOrigin(0);
        this.break= this.add.rectangle(100,h*0.5, cars[this.i].break*200/1, 15, 0xAA4A44 ).setOrigin(0);

        this.add.text(20, h*0.55, 'Aero', {fontSize: 18}).setOrigin(0);
        this.add.rectangle(100, h*0.55, 200, 15, 0xa9a9a9).setOrigin(0);
        this.aerodynamic= this.add.rectangle(100,h*0.55, cars[this.i].aerodynamic*200/200, 15, 0xAA4A44 ).setOrigin(0);

        this.add.text(20, h*0.6, 'Resist', {fontSize: 18}).setOrigin(0);
        this.add.rectangle(100, h*0.6, 200, 15, 0xa9a9a9).setOrigin(0);
        this.resistence= this.add.rectangle(100,h*0.6, cars[this.i].resistence*200/8000, 15, 0xAA4A44 ).setOrigin(0);


        //buttons Interaction

        back.on('pointerdown', ()=>{
            this.scene.stop();
            this.scene.start('HomeScene');
        })
        right.on('pointerdown', ()=>{
            this.i++;
            if(this.i>cars.length-1)this.i=0
            right.setAlpha(0.6);
        });
        right.on('pointerup', ()=>right.setAlpha(1));
        right.on('pointerout', ()=>right.setAlpha(1));

        left.on('pointerdown', ()=>{
            this.i--;
            if(this.i<0)this.i=cars.length-1
            left.setAlpha(0.6)
        });
        left.on('pointerup', ()=>left.setAlpha(1));
        left.on('pointerout', ()=>left.setAlpha(1));

        this.confirmBtn.on('pointerdown', ()=>{
            const isBought= playerStats.garage.find(car=>car.id===cars[this.i].id);
            if(!isBought){
                playerStats.garage.push(cars[this.i]);
                playerStats.coins-=cars[this.i].price;

                editProfile({
                    id: playerStats.id,
                    coins: playerStats.coins
                });
                buyCar({id: playerStats.id,car: cars[this.i]});
                this.buyTxt.setText('Bought')
                
            }else{
                this.confirmBtn.disableInteractive()
                console.log('You have this car already')
            }
            console.log('garage', playerStats.garage)
        })
    }

    update(){
        this.carPic.setTexture(`shop${cars[this.i].path}`);
        this.carName.setText(cars[this.i].name);
        this.carPrice.setText(cars[this.i].price);
        this.speed.setSize(cars[this.i].maxSpeed*200/500, 15);
        this.acceleration.setSize(cars[this.i].acceleration*200/500, 15);
        this.break.setSize(cars[this.i].break*200/1, 15);
        this.aerodynamic.setSize(cars[this.i].aerodynamic*200/200, 15);
        this.resistence.setSize(cars[this.i].resistence*200/8000, 15);

        //Check if car is already bought;
        const isBought= playerStats.garage.find(car=>car.id===cars[this.i].id);
        
        if(isBought!==undefined){
            this.confirmBtn.disableInteractive();
            this.confirmBtn.setVisible(false);
            this.buyTxt.setText('Already bought')
            
        }
        else if(playerStats.level<cars[this.i].levelRequire){
            this.confirmBtn.disableInteractive();
            this.confirmBtn.setVisible(false);
            this.buyTxt.setText(`Unloack at level ${cars[this.i].levelRequire}`)
            return
        }
        else if(playerStats.coins<cars[this.i].price){
            this.confirmBtn.disableInteractive();
            this.confirmBtn.setVisible(false);
            this.buyTxt.setText('Not enough money')
            return
        }else{
            this.confirmBtn.setInteractive();
            this.confirmBtn.setVisible(true);
            this.buyTxt.setText('Buy');
            
        }

        this.playerCoins.setText(playerStats.coins)
    }
}