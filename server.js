const express= require('express');
const app = express();
const http= require('http');
const server= http.Server(app);
const io= require('socket.io')(server)
const cors= require('cors');
const mongoose= require('mongoose');
require('dotenv').config();
const tracksRouter = require('./Routers/tracksRouter');
const usersRouter = require('./Routers/usersRouter');
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, ()=>{
    console.log('Mongoose connected successfuly!')
})

let listOfPlayers=[];
let counter=0;
let raceOn= false;
const laps=[]
let standings=[];
let trackNumber;

//Middlewares

app.use(cors());
app.use(express.json())
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', async (socket)=>{
    
    console.log(`${socket.id} connected.`)
    if(!raceOn && counter<20){
        socket.join("room1");
        listOfPlayers.push({id: socket.id, position: counter})
        counter++
        if(counter>20){
            counter=0
        }
        
    }else{
        socket.emit('raceOn', {race: true})
    }
    

    socket.on('connected', (data)=>{
        
        listOfPlayers.forEach(player=>{
            if(data.id===player.id){
                player.name= data.name
                player.stats= data.stats
            }
        })
        
        if(listOfPlayers.length===1){
            trackNumber = Math.floor(Math.random()*2)  
        }
        io.in('room1').emit('clients', listOfPlayers)
        io.in('room1').emit('clientsCar', ({id: data.id, car: data.car}))
        socket.emit('trackNumber', trackNumber)
    })

    socket.on('disconnect', ()=>{
        socket.leave('room1');
        io.in('room1').emit('clients', listOfPlayers)
        listOfPlayers=listOfPlayers.filter(i=>i.id!==socket.id);
        //socket.to("room1").emit('gameOver', {id: socket.id});
        counter--;
        if(counter<0){
            counter=0
        }
        console.log(`${socket.id} disconnected. Users remaining: `, listOfPlayers)
        if(listOfPlayers.length<=0){
            standings=[]
            raceOn=false
        }
    })

    socket.on('startPlay', data=>{
        raceOn=true
        io.to('room1').emit('play', data)
    })

    socket.on('playerMoving', (data)=>{
        socket.to('room1').emit('playerMoves', data)
    })

    socket.on('newLap', (data)=>{
        const fastestLap= laps[0] || 0
        laps.push(data);
        laps.sort((a,b)=>a.time-b.time)
        if(laps.length>0){
            if(laps[0].time!==fastestLap.time){
                io.in('room1').emit('newFastLap', {info: 'New fastest lap' ,laptime: laps[0].time, player: {name: laps[0].player.name, id: laps[0].player.id}})
            }
        }
    })

    socket.on('gameOver', (data)=>{
        socket.to("room1").emit('gameOver', data);
    })

    socket.on('endGame', data=>{
        if(data.endRace){
            raceOn=false;
            standings.push({name: data.winner, id: data.id, socket: data.socketId, time: data.raceTime});
            console.log('standing/listOfPlayers', standings, listOfPlayers.length);
            const driver= standings.find(dr=>dr.socket===data.socketId)
            const position= standings.indexOf(driver);
            console.log('driver position: ', position)
            io.in('room1').emit('playerEndRace', {endRace: true, position: position+1, driver: data.name, time: data.raceTime, bestLap: standings[0].time})
            if(standings.length>=listOfPlayers.length){
                const winner= standings[0].name
                io.in('room1').emit('endRace', {endRace: true, winner: winner, driver: data.driver})
            }
            
        }
    })

    socket.on('backHome', ()=>{
        socket.disconnect()
    })
    
})

const PORT= process.env.PORT
server.listen(PORT || 3000, ()=>{
    console.log(`Server running on ${PORT}`)
})
