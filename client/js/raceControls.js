class RaceControls{
    constructor(scene, device, player, joystick,button,button2, pointer1, cursors){
        this.scene= scene;
        this.joyStick= joystick;
        this.accelerationBtn= button;

        if(device!=='desktop'){

            this.scene.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
            if(this.joyStick.pointer){
                const angle= this.joyStick.angle;
                const force= this.joyStick.force;
                console.log('rotation' ,player.body.rotation)
                if(angle < -90 || angle > 90){
                    player.body.angularVelocity = -150;
                }else{
                    console.log('angle pos: ', angle)
                    player.body.angularVelocity = 150;
                }
                
            }else{
                player.body.angularVelocity = 0;
            }
            
            
            this.accelerationBtn.on('pointerdown', ()=>{
                player.body.acceleration.setToPolar(player.rotation, 100);
                this.accelerationBtn.setAlpha(0.5)
            })
            this.accelerationBtn.on('pointerup', ()=>{
                player.setAcceleration(0);
                player.body.setDrag(0.9);
                this.accelerationBtn.setAlpha(0.9)
            })
            this.accelerationBtn.on('pointerout', ()=>{
                player.setAcceleration(0);
                player.body.setDrag(0.9);
                this.accelerationBtn.setAlpha(0.9)
            })
            button2.on('pointerdown', () =>{
                player.setAcceleration(0)
                player.body.setDrag(0.3);
                button2.setAlpha(0.5)
            })
            button2.on('pointerup', ()=>{
                player.setAcceleration(0);
                player.body.setDrag(0.9);
                button2.setAlpha(0.9)
            })
            button2.on('pointerout', ()=>{
                player.setAcceleration(0);
                player.body.setDrag(0.9);
                button2.setAlpha(0.9)
            })
        }else{

            //Desktop -> Arrows directions

            player.setAcceleration(0);
            player.body.setDrag(0.9);
            player.body.angularVelocity = 0;

            if (cursors.left.isDown) {
                player.body.angularVelocity = -150;
            }
            if (cursors.right.isDown) {
            player.body.angularVelocity = 150;
            }
        
            if (cursors.up.isDown) {
            player.body.acceleration.setToPolar(player.rotation, 100);
            } else if (cursors.down.isDown) {
                player.setAcceleration(0)
                player.body.setDrag(0.3);
            } else {
                player.setAcceleration(0)
                player.body.setDrag(0.9);
                
            }
            
            this.scene.physics.velocityFromRotation(player.rotation, player.body.speed, player.body.velocity);
        
            if (!cursors.up.isDown && player.body.speed < 10) {
            // Come to a full stop.
            // This also stops rotation.
            player.body.stop();
            }    
        }
    }
    
    
}