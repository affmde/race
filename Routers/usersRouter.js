const Users = require('../Modules/usersModel');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken')
const usersRouter= require('express').Router();


usersRouter.post('/newUser', async (req, res)=>{
    const body= req.body;
    const passwordHash= await bcrypt.hash(body.password, 10)
    const newUser = {
        name: body.name,
        username: body.username,
        password: passwordHash,
        email: body.email,
        experience: 0,
        coins: 0,
        level: 0,
        wins: 0,
        races: [],
        driver: 'driver1',
        garage:[],
        objectivesCompleted: []
        
    }
    const saveUser= new Users(newUser);

    try{
        const response = await saveUser.save()
        res.status(201).json(response)
    }catch(err){
        console.log(err)
    }
})


usersRouter.post('/login', async (req, res)=>{
    const body= req.body;
    const username= body.username;
    const password= body.password;

    const user= await Users.findOne({username});
    const id= user.id;
    console.log('user id: ', id)
    const passwordCorrect= user === null ? false : await bcrypt.compare(password, user.password);
    

    if(!user || !passwordCorrect){
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 });
    const updatelogin = await Users.findByIdAndUpdate(id, {$set:{lastLogin: Date.now()}}, {new: true});
    const response= {
        token: token, 
        username: user.username, 
        name: user.name, 
        experience: user.experience,
        level: user.level,
        coins: user.coins,
        races: user.races,
        id: user._id,
        email: user.email,
        wins: user.wins,
        driver: user.driver,
        lastLogin: updatelogin.lastLogin,
        garage: user.garage,
        objectivesCompleted: user.objectivesCompleted
    }


    res.status(200).send(response)

})


usersRouter.post('/addRace', async (req, res)=>{
    const body= req.body;
    const id= body.id;
    try{
        const user= await Users.findByIdAndUpdate(id, {$push:{races: body.race}}, {new: true})
            .then(docs=>res.status(200).send(docs))
    }catch(err){
        res.status(401).json({ error: err })
    }
    
})

usersRouter.post('/updateReward', async (req, res)=>{
    const body=req.body;
    const id= body.id;
    try{
        const user= await Users.findByIdAndUpdate(id, {experience: body.experience, coins: body.coins}, {new: true})
            .then(docs=>res.status(200).send(docs))
    }catch(err){
        res.status(401).json({ error: err })
    }
})


usersRouter.post('/addWin', async (req, res)=>{
    const body=req.body;
    const id= body.id;
    try{
        const user= await Users.findByIdAndUpdate(id, {$inc:{wins: 1}}, {new: true})
            .then(docs=>res.status(200).send(docs))
    }catch(err){
        res.status(401).json({ error: err })
    }
})


usersRouter.post('/infoEdit', async (req, res)=>{
    const body=req.body;
    const id= body.id;
    
    const update= delete body['id']
    console.log('updated body: ', body)
    try{
        const user= await Users.findByIdAndUpdate(id, body, {new: true})
            .then(docs=>res.status(200).send(docs))
    }catch(err){
        res.status(401).json({ error: err })
    }
})


usersRouter.post('/buyCar', async (req, res)=>{
    const body= req.body;
    const id= body.id;
    
    try{
        const user= await Users.findByIdAndUpdate(id, {$push:{garage: body.car}}, {new: true})
            .then(docs=>res.status(200).send(docs))
    }catch(err){
        res.status(401).json({ error: err })
    }
    
})



usersRouter.post('/addObjective', async (req, res)=>{
    const body= req.body;
    const id= body.id;
    
    try{
        const user= await Users.findByIdAndUpdate(id, {$push:{objectivesCompleted: body.objective}}, {new: true})
            .then(docs=>res.status(200).send(docs))
    }catch(err){
        res.status(401).json({ error: err })
    }
    
})


module.exports = usersRouter;