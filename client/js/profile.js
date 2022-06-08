class Profile extends Phaser.Scene{
    constructor(){
        super({key: 'Profile'})
    }

    preload(){
        this.load.image('profileBg', 'assets/gameOverBg.png');
        drivers.forEach(driver=>{
            this.load.image(`profile${driver.path}`, `assets/characters/${driver.path}.png`)
        })
        this.load.image('profileEdit', 'assets/edit.png');
        this.load.html('editForm', 'assets/editForm.html');
        this.load.image('editBlueBtn', 'assets/blue_button04.png');
        this.load.image('editBackBtn', 'assets/back_btn.png')
    }

    create(){
        this.add.image(0,0,'profileBg').setOrigin(0);
        this.add.text(w*0.5, h*0.1, 'Profile', {fontSize: 35}).setOrigin(0.5);
        this.add.image(20,20, 'editBackBtn').setOrigin(0).setInteractive({cursor: 'pointer'}).on('pointerdown', ()=>{
            this.scene.stop();
            this.scene.start('HomeScene');
        });

        //Left Area
        this.add.image(w*0.25, h*0.5, `profile${playerStats.driver}`).setOrigin(0.5);
        this.add.image(w*0.25, h*0.85, 'editBlueBtn').setOrigin(0.5).setInteractive({cursor: 'pointer'}).on('pointerdown', ()=>{
            this.scene.stop();
            this.scene.start('DriverSelection')
        });
        this.add.text(w*0.25, h*0.85, 'Change driver', {fontSize: 20}).setOrigin(0.5);
        //Right Side
        this.name= this.add.text(w*0.5, h*0.3, `Name: ${user.name}`).setOrigin(0, 0.5);
        this.username= this.add.text(w*0.5, h*0.4, `Username: ${user.username}`).setOrigin(0, 0.5);
        this.email= this.add.text(w*0.5, h*0.5, `Email: ${user.email}`).setOrigin(0, 0.5);
        this.add.text(w*0.5, h*0.6, `Stats`, {fontSize :25}).setOrigin(0, 0.5);
        this.add.text(w*0.5, h*0.7, `Level: ${playerStats.level}`).setOrigin(0, 0.5);
        this.add.text(w*0.5, h*0.75, `XP: ${playerStats.experience}`).setOrigin(0, 0.5);
        this.add.text(w*0.5, h*0.8, `Coins: ${playerStats.coins}`).setOrigin(0, 0.5);
        this.add.text(w*0.5, h*0.85, `Total wins: ${playerStats.wins}`).setOrigin(0, 0.5);
        this.nameEditBtn=this.add.image(w*0.9, h*0.3, 'profileEdit').setOrigin(0.5).setInteractive({cursor: 'pointer'});
        this.usernameEditBtn=this.add.image(w*0.9, h*0.4, 'profileEdit').setOrigin(0.5).setInteractive({cursor: 'pointer'});
        this.emailEditBtn=this.add.image(w*0.9, h*0.5, 'profileEdit').setOrigin(0.5).setInteractive({cursor: 'pointer'});

        this.nameEditBtn.on('pointerdown', ()=>{
            this.element = this.add.dom(w*0.5, h*0.5).createFromCache('editForm');
            this.element.setPerspective(800);
            this.element.addListener('click');
            let input = this.element.getChildByName('name');

            this.element.on('click', (e)=>{
                this.nameEditBtn.disableInteractive();
                this.usernameEditBtn.disableInteractive();
                this.emailEditBtn.disableInteractive();
                if (e.target.name === 'loginButton'){
                    user.name= input.value;
                    editProfile({name: user.name, id: playerStats.id})
                    this.name.setText(`Name: ${user.name}`)
                    this.closeElement();
                }else if(e.target.name==='closeBtn'){
                    this.closeElement();
                }
                    
            })
        })

        this.usernameEditBtn.on('pointerdown', ()=>{
            this.element = this.add.dom(w*0.5, h*0.5).createFromCache('editForm');
            this.element.setPerspective(800);
            this.element.addListener('click');
            let input = this.element.getChildByName('name');

            this.element.on('click', (e)=>{
                this.nameEditBtn.disableInteractive();
                this.usernameEditBtn.disableInteractive();
                this.emailEditBtn.disableInteractive();
                if (e.target.name === 'loginButton'){
                    user.username= input.value;
                    editProfile({username: user.username, id: playerStats.id});
                    playerStats.username=user.username;
                    this.username.setText(`Username: ${user.username}`)
                    this.closeElement();
                }else if(e.target.name==='closeBtn'){
                    this.closeElement();
                }
                    
            })
        })

        this.emailEditBtn.on('pointerdown', ()=>{
            this.element = this.add.dom(w*0.5, h*0.5).createFromCache('editForm');
            this.element.setPerspective(800);
            this.element.addListener('click');
            let input = this.element.getChildByName('name');

            this.element.on('click', (e)=>{
                this.nameEditBtn.disableInteractive();
                this.usernameEditBtn.disableInteractive();
                this.emailEditBtn.disableInteractive();
                if (e.target.name === 'loginButton'){
                    user.email= input.value;
                    editProfile({email: user.email, id: playerStats.id})
                    this.email.setText(`Email: ${user.email}`)
                    this.closeElement();
                }else if(e.target.name==='closeBtn'){
                    this.closeElement();
                }
                    
            })
        })
    }

    update(){

    }

    closeElement(){
        this.element.setVisible(false)
        this.nameEditBtn.setInteractive({cursor: 'pointer'});
        this.usernameEditBtn.setInteractive({cursor: 'pointer'});
        this.emailEditBtn.setInteractive({cursor: 'pointer'});
    }
}