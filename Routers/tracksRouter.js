const Tracks = require('../Modules/tracksModules');

const tracksRouter= require('express').Router();


tracksRouter.post('/newLap', async (req, res)=>{
    
    const body= req.body;
    const newLap={
        username: body.username,
        track: body.track,
        time: body.time,
        lap: body.lap,
        id: body.id,
        car: body.car
    }
    const lapSave = new Tracks(newLap);
    try{
        const response= await lapSave.save();
        res.status(201).json(response)
    }catch(err){
        res.status(401).json({ error: err })
    }

})


tracksRouter.get('/laps', async (req, res)=>{
    const body= req.body;
    try{
        const allLaps= await Tracks.find({})
        res.status(200).json(allLaps)

    }catch(err){
        res.status(401).json({ error: err })
    }
})



module.exports = tracksRouter;