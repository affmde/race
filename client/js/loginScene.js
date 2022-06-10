let user={
    token: undefined
}
var date = new Date();
date.setDate(date.getDate() + 7);

class LoginScene extends Phaser.Scene{
    constructor(){
        super({key: 'LoginScene'})
    }

    preload(){
        this.load.image('loginBg', 'assets/homescreen.png');
        this.load.image('loginBlueBtn', 'assets/button_blue.png');
        this.load.plugin('rexmodalplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmodalplugin.min.js', true);
        this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true);
        this.load.image('loginCloseBtn', 'assets/red_close_button.png');
        this.load.html('form', 'assets/form.html');
        this.load.html('registerForm', 'assets/registerForm.html');
    }

    create(){
        const bg= this.add.image(0,0,'loginBg').setOrigin(0);
        const title= this.add.text(w/2, h*0.20, 'The Racer', {
			fontFamily: 'Quicksand',
			fontSize: '55px',
			color: 'black',
			fontStyle: 'normal',
			strokeThickness: 3,
			shadow: { blur: 5, stroke: true, fill: false },
			padding: { left: null }
		}).setOrigin(0.5);

        this.loginBtn= this.add.image(w*0.5, h*0.5, 'loginBlueBtn').setOrigin(0.5).setAlpha(0.9).setInteractive({cursor: "pointer" });
        const singlePlayerTxt= this.add.text(w*0.5, h*0.5, 'Login', {fontSize: 30}).setOrigin(0.5)
        this.registerBtn= this.add.image(w*0.5, h*0.8, 'loginBlueBtn').setOrigin(0.5).setAlpha(0.9).setInteractive({cursor: "pointer" });
        const registerTxt= this.add.text(w*0.5, h*0.8, 'Register', {fontSize: 30}).setOrigin(0.5)
        
        this.loginBtn.on('pointerdown', ()=>{
            this.loginBtn.disableInteractive();
            this.registerBtn.disableInteractive();
            this.element = this.add.dom(w*0.5, h*0.5).createFromCache('form');
            this.element.setPerspective(800);
            this.element.addListener('click');
            let inputUsername = this.element.getChildByName('name');
            let inputPassword = this.element.getChildByName('password');
            this.wrongInput= this.element.getChildByID('wrongInput');
            this.element.on('click', (e)=>{
                if (e.target.name === 'loginButton'){
                    this.usernameLogin= inputUsername.value;
                    this.passwordLogin= inputPassword.value;
                    this.login()
                }else if(e.target.name==='closeBtn'){
                    this.element.setVisible(false)
                    this.loginBtn.setInteractive({cursor: 'pointer'});
                    this.registerBtn.setInteractive({cursor: 'pointer'});
                }
                    
            })
        })


        //Register
        this.registerBtn.on('pointerdown', ()=>{
            this.registerBtn.disableInteractive();
            this.loginBtn.disableInteractive();
            this.element = this.add.dom(w*0.5, h*0.5).createFromCache('registerForm');
            this.element.setPerspective(800);
            this.element.addListener('click');
            let inputUsername = this.element.getChildByName('username');
            let inputPassword = this.element.getChildByName('password');
            let inputName= this.element.getChildByName('name');
            let inputEmail= this.element.getChildByName('email');
            
            this.element.on('click', (e)=>{
                if (e.target.name === 'loginButton'){
                    this.username= inputUsername.value;
                    this.password= inputPassword.value;
                    this.playerName= inputName.value;
                    this.email= inputEmail.value
                    this.newPlayer();
                }else if(e.target.name==='closeBtn'){
                    this.element.setVisible(false)
                    this.registerBtn.setInteractive({cursor: 'pointer'});
                    this.loginBtn.setInteractive({cursor: 'pointer'});
                }
                    
            })
            
        })

        
    }

    update(){
        if(user.token){
            this.scene.stop();
            this.scene.start('HomeScene')
        }else{
            return
        }

    }


    async newPlayer(){
        const body= {
            name: this.playerName,
            username: this.username,
            password: this.password,
            email: this.email,
        }
        const requestOptions= {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        try{
            const response= await fetch('/users/newUser', requestOptions);
            const data= await response.json();
            console.log('new player data: ', data)
            if(data){
                this.element.setVisible(false)
                this.registerBtn.setInteractive({cursor: 'pointer'});
                this.loginBtn.setInteractive({cursor: 'pointer'});
            }else{
                console.log('no data: ', data)
            }
        }catch(err){
            console.log(err)
        }
        

        
    }

    async login(){
        const body= {
            username: this.usernameLogin,
            password: this.passwordLogin
        }
        const requestOptions= {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        try{
            const response = await fetch('/users/login', requestOptions);
            const data= await response.json();
            user= data;
    
            //Load player data
            playerStats.coins= user.coins;
            playerStats.experience= user.experience;
            playerStats.level= getLevel().level;
            playerStats.name= user.name;
            playerStats.username= user.username;
            playerStats.races= user.races;
            playerStats.id= user.id
            playerStats.wins= user.wins;
            playerStats.driver= user.driver;
            playerStats.garage= user.garage,
            playerStats.objectivesCompleted= user.objectivesCompleted
            
            if(!user.token){
                this.wrongInput.style.display= 'block';
            }else{
                console.log('Connected ')
            }
        }catch(err){
            console.log(err);
        }
        
    }
}

