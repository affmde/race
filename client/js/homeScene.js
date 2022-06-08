let socket;
let typeOfGame;
const lapsByTrack= {
    fastLaine: [],
    lastDiamond: []
}
let fastLainScores=[];
let lastDiamondScores=[]

class HomeScene extends Phaser.Scene{
    constructor(){
        super({key: 'HomeScene'})
    }

    preload(){
        this.load.image('homeScreen', 'assets/homescreen.png');
        this.load.image('blueButton', 'assets/button_blue.png');
        this.load.image('yellowButton', 'assets/button_yellow.png');
        this.load.image('homeLogoutBtn', 'assets/logout_button.png');
        this.load.image('homeStar', 'https://img.icons8.com/color/2x/christmas-star.png')
        drivers.forEach(driver=>{
            this.load.image(driver.path, `assets/characters/${driver.path}.png`)
        })
        this.load.image('homeCoins', 'assets/coins.png');
    }

    create(){
        playerStats.level=getLevel().level    
        console.log('player: ', playerStats);

        this.fulfillLaps()
        //Page build
        const homeScreen = this.add.image(0,0,'homeScreen').setOrigin(0).setAlpha(0.4);
        const title= this.add.text(w/2, h*0.20, `Welcome ${playerStats.username}`, {
			fontFamily: 'Quicksand',
			fontSize: '55px',
			color: 'black',
			fontStyle: 'normal',
			strokeThickness: 3,
			shadow: { blur: 5, stroke: true, fill: false },
			padding: { left: null }
		}).setOrigin(0.5);

        const blueButton= this.add.image(w*0.45, h*0.45, 'blueButton').setOrigin(0.5).setAlpha(0.9).setInteractive({cursor: "pointer" })
        const singlePlayerTxt= this.add.text(w*0.45, h*0.45, 'Single player', {fontSize: 22}).setOrigin(0.5)
        const blueButton2= this.add.image(w*0.8, h*0.45, 'blueButton').setOrigin(0.5).setAlpha(0.9).setInteractive({cursor: "pointer" })
        const multiplayerTxt= this.add.text(w*0.8, h*0.45, 'Multiplayer', {fontSize: 22}).setOrigin(0.5);
        const blueButton3= this.add.image(w*0.45, h*0.7, 'blueButton').setOrigin(0.5).setAlpha(0.9).setInteractive({cursor: "pointer" })
        const profileTxt= this.add.text(w*0.45, h*0.7, 'Profile', {fontSize: 22}).setOrigin(0.5);
        const blueButton4= this.add.image(w*0.8, h*0.7, 'yellowButton').setOrigin(0.5).setAlpha(0.9).setInteractive({cursor: "pointer" })
        const shopTxt= this.add.text(w*0.8, h*0.7, 'Shop', {fontSize: 22}).setOrigin(0.5);
        const logoutBtn= this.add.image(w-20, 20, 'homeLogoutBtn').setOrigin(1, 0).setInteractive({cursor: 'pointer'});
        this.driverPic= this.add.image(w*0.2, h*0.6, playerStats.driver).setOrigin(0.5);
        this.actualXp= playerStats.experience-getLevel().before;
        this.totalXpCalc= getLevel().total-getLevel().before;
        this.totalXp= this.add.rectangle(30, 20, 300, 30, 0xDCDCDC).setOrigin(0).setAlpha(0.5);
        this.star= this.add.image(30, 30, 'homeStar').setOrigin(0.5).setScale(0.7).setDepth(5);
        this.xp= this.add.rectangle(30, 20, this.actualXp*300/this.totalXpCalc, 30, 0xDAA520).setOrigin(0)
        this.level= this.add.text(30, 30, playerStats.level, {fontSize: 30}).setOrigin(0.5).setDepth(6);
        this.add.image(w-120, 35, 'homeCoins').setOrigin(0.5);
        this.add.text(w-90, 35, playerStats.coins, {fontSize: 25}).setOrigin(0.5);

        blueButton.on('pointerdown', ()=>{
            typeOfGame='singlePlayer';
            this.scene.stop();
            this.scene.start('CarSelection')
        })
        blueButton2.on('pointerdown', ()=>{
            typeOfGame='multiplayer'
            this.scene.stop();
            this.scene.start('CarSelection')
        })
        
        blueButton3.on('pointerdown', ()=>{
            this.scene.stop();
            this.scene.start('Profile')
        })

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

    }

    update(){

    }

    async fulfillLaps(){
        try{
            const laps= await getLaps();
            laps.forEach(lap=>{
                if(lap.track==='Fast Lain'){
                    lapsByTrack.fastLaine.push(lap)
                }else if(lap.track==='Last Diamond'){
                    lapsByTrack.lastDiamond.push(lap)
                }else{
                    return
                }
            })
            //Sort by time
            lapsByTrack.fastLaine.sort((a,b)=>a.time-b.time)
            lapsByTrack.lastDiamond.sort((a,b)=>a.time-b.time)
            let a= [];
            let b=[];
            for(let i=0; i<3; i++){
                a.push(lapsByTrack.fastLaine[i]);
                b.push(lapsByTrack.lastDiamond[i]);
            }
            fastLainScores=a;
            lastDiamondScores= b;
        }catch(err){
            console.log(err)
        }
    }
}

const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
  };

const device = deviceType();
