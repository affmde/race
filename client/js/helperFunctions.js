const timeConverter= (time)=>{
    let min= Math.floor(time/ 60)
    let sec= Math.floor(time) - (60 * min)
    const milisec= (time - Math.floor(time))*1000
    let miliseconds= Math.floor(milisec)
    let timeText= `${min<10? '0'+min : min}:${sec<10? '0'+sec :sec}:${miliseconds}`
    return timeText
}

const getLevel = () =>{
    if(playerStats.experience<=1500){
        return {
            level: 0,
            total: 1500,
            before: 0
        }
    }else if(playerStats.experience<=3000){
        return {
            level: 1,
            total: 3000,
            before: 1500
        }
    }else if(playerStats.experience<=4500){
        return {
            level: 2,
            total: 4500,
            before: 3000
        }
    }else if(playerStats.experience<=6000){
        return {
            level: 3,
            total: 6000,
            before: 4500
        }
    }else if(playerStats.experience<=8000){
        return {
            level: 4,
            total: 8000,
            before: 6000
        }
    }
    else if(playerStats.experience<=10000){
        return {
            level: 5,
            total: 10000,
            before: 8000
        }
    } else if(playerStats.experience<=12000){
        return {
            level: 6,
            total: 12000,
            before: 10000
        }
    }else if(playerStats.experience<15000){
        return {
            level: 7,
            total: 15000,
            before: 12000
        }
    }else if(playerStats.experience<18000){
        return {
            level: 8,
            total: 18000,
            before: 15000
        }
    }else if(playerStats.experience<=21000){
        return {
            level: 9,
            total: 21000,
            before: 18000
        }
    }else if(playerStats.experience<=24000){
        return {
            level: 10,
            total: 24000,
            before: 21000
        }
    }else if(playerStats.experience<=29000){
        return{
            level: 11,
            total: 29000,
            before: 24000
        }
    }else if(playerStats.experience<=35000){
        return{
            level: 12,
            total: 35000,
            before: 29000
        }
    }
}

const xpReward = (bestLap1, bestLap2, bestLap3, finishedRace, winner) =>{
    let totalXpWon= 0
    if(bestLap1){
        totalXpWon+=150
    }else if(bestLap2){
        totalXpWon+=100
    }else if(bestLap3){
        totalXpWon+=50
    }

    if(finishedRace){
        totalXpWon+=25;
    }

    if(winner){
        totalXpWon+=350
    }
    return totalXpWon  
}


const dateConverter = (date) =>{
    const d= new Date(date)
    const dString = d.toDateString();
    if(playerStats.loginDays.includes(dString)){
        listOfObjectives[playerStats.objectivesLevel][0].status.received=true;
    }else{
        playerStats.loginDays.push(dString);
        listOfObjectives[playerStats.objectivesLevel][0].status.completed=true;
        addLoginDay({id: playerStats.id, day: dString});
    }
    
}



//Fetch funcitons
const saveLap= async (lap)=>{
    const body= {
        username: lap.player.name,
        track: lap.track,
        time: lap.time,
        lap: lap.lap,
        id: lap.player.id,
        car: lap.car
    }
    const requestOptions= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }

    try{
        const response= await fetch('/tracks/newLap', requestOptions);
        const data = await response.json();
    }catch(err){
        console.log(err)
    }
}


const saveRace= async(race) =>{
    const body= {
        race: race,
        id: playerStats.id
    }
    const requestOptions= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }

    try{
        const response= await fetch('/users/addRace', requestOptions);
        const data= await response.json();
    }catch(err){
        console.log(err)
    }
}


const getLaps = async () =>{
    
    const requestOptions= {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }


    try{
        const response= await fetch('/tracks/laps', requestOptions);
        const data= await response.json();
        return data
    }catch(err){
        console.log(err)
    }
    
}


const saveReward = async () =>{
    const body= {
        experience: playerStats.experience,
        coins: playerStats.coins,
        id: playerStats.id
    }
    const requestOptions= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }

    try{
        const response= await fetch('/users/updateReward', requestOptions);
        const data= await response.json();
    }catch(err){
        console.log(err)
    }
}

const addWin = async () =>{
    const body= {
        id: playerStats.id
    }
    const requestOptions= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    try{
        const response= await fetch('/users/addWin', requestOptions);
        const data= await response.json();
    }catch(err){
        console.log(err)
    }
}

const editProfile = async (info) =>{
    
    const requestOptions= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    }
    try{
        const response= await fetch('/users/infoEdit', requestOptions);
        const data= await response.json();
    }catch(err){
        console.log(err)
    }
}


const buyCar = async (car) =>{
    const requestOptions= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    }

    try{
        const response= await fetch('/users/buyCar', requestOptions);
        const data= await response.json();
    }catch(err){
        console.log(err)
    }
}

const addObjective = async (obj) => {
    const requestOptions= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }

    try{
        const response= await fetch('/users/addObjective', requestOptions);
        const data= await response.json();
    }catch(err){
        console.log(err)
    }

}


const addLoginDay = async (obj) =>{
    const requestOptions= {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }

    try{
        const response= await fetch('/users/addLoginDay', requestOptions);
        const data= await response.json();
    }catch(err){
        console.log(err)
    }
}


