const playerStats={
    coins: 0,
    experience: 0,
    level: 0,
    name: undefined,
    username: undefined,
    races: [],
    id: undefined,
    driver: 'driver1',
    wins: 0,
    consecutiveLoginDays: 0,
    garage:[],
    objectivesCompleted: []
}

const startingPositions=[
    {
        id:1,
        x: 2124,
        y: 2048
    },
    {
        id: 2,
        x: 2124,
        y: 2176
    },
    {
        id: 3,
        x: 2006,
        y: 2048
    },
    {
        id: 4,
        x: 2006,
        y: 2176
    },
    {
        id: 5,
        x: 1878,
        y: 2048
    },
    {
        id: 6,
        x: 1878,
        y: 2176
    },
    {
        id: 7,
        x: 1750,
        y: 2048
    },
    {
        id: 8,
        x: 1750,
        y: 2176 
    },
    {
        id: 9,
        x: 1622,
        y: 2048,
    },
    {
        id: 10,
        x: 1622,
        y: 2176
    },
    {
        id: 11,
        x: 1494,
        y:2048
    },
    {
        id: 12,
        x: 1494,
        y: 2176
    },
    {
        id: 13,
        x: 1366,
        y: 2048
    },
    {
        id: 14,
        x: 1366,
        y: 2176
    },
    {
        id: 15,
        x: 1238,
        y: 2048
    },
    {
        id: 16,
        x: 1238,
        y: 2176
    },
    {
        id: 17,
        x: 1110,
        y: 2048
    },
    {
        id: 18,
        x: 1110,
        y: 2176
    },
    {
        id: 19,
        x: 982,
        y: 2048
    },
    {
        id: 20,
        x: 982,
        y: 2176
    },
    {
        id: 21,
        x: 854,
        y: 2048
    },{
        id: 22,
        x: 854,
        y: 2176
    }

]


tracks=[
    {
        id: 0,
        name: 'Fast Lain',
        path: 'fastLain',
        map: 'map1'
    },
    {
        id: 1,
        name: 'Last Diamond',
        path: 'lastDiamond',
        map: 'map2'
    }
]

const cars=[
    {
        id: 0,
        name: 'Red Race Car',
        path: 'red_sport_car',
        acceleration: 120,
        maxSpeed: 300,
        break: 0.5,
        aerodynamic: 100,
        resistence:3000,
        price: 0,
        levelRequire: 0
    },
    {
        id: 1,
        name: 'Yellow Race Car',
        path: 'yellow_sport_car',
        acceleration: 120,
        maxSpeed: 300,
        break: 0.5,
        aerodynamic: 100,
        resistence:3000,
        price: 0,
        levelRequire: 0
    },
    {
        id: 2,
        name: 'Blue Race Car',
        path: 'blue_sport_car',
        acceleration: 120,
        maxSpeed: 300,
        break: 0.5,
        aerodynamic: 100,
        resistence:3000 ,
        price: 0,
        levelRequire: 0
    },
    {
        id: 3,
        name: 'Black Race Car',
        path: 'black_sport_car',
        acceleration: 120,
        maxSpeed: 300,
        break: 0.5,
        aerodynamic: 100,
        resistence:3000,
        price: 0,
        levelRequire: 0
    },
    {
        id: 4,
        name: 'Green Race Car',
        path: 'green_sport_car',
        acceleration: 120,
        maxSpeed: 300,
        break: 0.5,
        aerodynamic: 100,
        resistence:3000,
        price: 0,
        levelRequire: 0 
    },
    {
        id: 5,
        name: 'Mini van',
        path: 'Mini_van',
        acceleration: 100,
        maxSpeed: 300,
        break: 0.2,
        aerodynamic: 120,
        resistence:4500,
        price: 7000,
        levelRequire: 1
    },
    {
        id: 6,
        name: 'Mini truck',
        path: 'Mini_truck',
        acceleration: 90,
        maxSpeed: 300,
        break: 0.3,
        aerodynamic: 120,
        resistence:6500,
        price: 5200,
        levelRequire: 1
    },
    {
        id: 7,
        name: 'Truck',
        path: 'truck',
        acceleration: 80,
        maxSpeed: 290,
        break: 0.3,
        aerodynamic: 100,
        resistence:7000,
        price: 10000,
        levelRequire: 3
    },
    {
        id: 8,
        name: 'Ambulance',
        path: 'Ambulance',
        acceleration: 90,
        maxSpeed: 320,
        break: 0.5,
        aerodynamic: 120,
        resistence:4000,
        price: 12000,
        levelRequire: 4
    },
    {
        id: 9,
        name: 'Toyota',
        path: 'toyota',
        acceleration: 140,
        maxSpeed: 320,
        break: 0.5,
        aerodynamic: 135,
        resistence:3000,
        price: 15000,
        levelRequire: 4
    },
    {
        id: 10,
        name: 'Police',
        path: 'Police',
        acceleration: 100,
        maxSpeed: 330,
        break: 0.3,
        aerodynamic: 150,
        resistence:3500,
        price: 15000,
        levelRequire: 5
    },
    {
        id: 11,
        name: 'Taxi',
        path: 'Taxi',
        acceleration: 95,
        maxSpeed: 335,
        break: 0.4,
        aerodynamic: 145,
        resistence:3500,
        price: 15000,
        levelRequire: 5
    },
    {
        id: 12,
        name: 'Orange Racer',
        path: 'orange_racer',
        acceleration: 140,
        maxSpeed: 340,
        break: 0.5,
        aerodynamic: 150,
        resistence:3300,
        price: 25000,
        levelRequire: 7
    },
    {
        id: 13,
        name: 'Ford Fiesta',
        path: 'ford_fiesta',
        acceleration: 150,
        maxSpeed: 360,
        break: 0.4,
        aerodynamic: 140,
        resistence:3500,
        price: 30000,
        levelRequire: 8
    },
    {
        id: 14,
        name: 'Audi',
        path: 'audi',
        acceleration: 150,
        maxSpeed: 380,
        break: 0.6,
        aerodynamic: 180,
        resistence:2800,
        price: 50000,
        levelRequire: 9
    },
    {
        id: 15,
        name: "Black Viper",
        path: "blackViper",
        acceleration: 200,
        maxSpeed: 400,
        break: 0.7,
        aerodynamic: 180,
        resistence:2500,
        price: 75000,
        levelRequire: 10
    },
    {
        id: 16,
        name: "Hypersport",
        path: "hypersport",
        acceleration: 240,
        maxSpeed: 440,
        break: 0.4,
        aerodynamic: 120,
        resistence:3000,
        price: 115000,
        levelRequire: 12
    },

]


drivers=[
    {
        id: 0,
        path: 'driver1'
    },
    {
        id: 1,
        path: 'driver2'
    },
    {
        id: 2,
        path: 'driver3'
    },
    {
        id: 3,
        path: 'driver4'
    },
    {
        id: 4,
        path: 'driver5'
    }
]


const listOfObjectives=[
    [
        {
            id: 0,
            name: 'Login today',
            reward: 5,
            status:{
                completed: false,
                received: false
            },
            condition: 0
        },
        {
            id: 1,
            name: 'Play a single player race.',
            reward: 10,
            status:{
                completed: false,
                received: false
            },
            condition: 0
        },
        {
            id: 2,
            name: 'Play a multiplayer Race',
            reward: 10,
            status:{
                completed: false,
                received: false
            },
            condition: 0
        },
        {
            id: 3,
            name: 'Win a race.',
            reward: 100,
            status:{
                completed: false,
                received: false
            },
            condition: 0
        },
        {
            id: 4,
            name: 'Complete 20 races',
            reward: 60,
            status:{
                completed: false,
                received: false
            },
            condition: 20
        },
        {
            id: 5,
            name: 'Complete 100 laps.',
            reward: 60,
            status:{
                completed: false,
                received: false
            },
            condition: 100
        },
        {
            id: 6,
            name: 'Buy a car.',
            reward: 10,
            status:{
                completed: false,
                received: false
            },
            condition: 0
        }
    ],
    [
        {
            id: 7,
            name: 'Login today',
            reward: 5,
            status:{
                completed: false,
                received: false
            },
            condition: 0
        },
        {
            id: 8,
            name: 'Play 100 race.',
            reward: 850,
            status:{
                completed: false,
                received: false
            },
            condition: 100
        },
        {
            id: 9,
            name: 'Play a multiplayer Race',
            reward: 10,
            status:{
                completed: false,
                received: false
            },
            condition: 0
        },
        {
            id: 10,
            name: 'Win 20 races.',
            reward: 100,
            status:{
                completed: false,
                received: false
            },
            condition: 20
        },
        {
            id: 11,
            name: 'Complete 80 races',
            reward: 500,
            status:{
                completed: false,
                received: false
            },
            condition: 80
        },
        {
            id: 12,
            name: 'Complete 500 laps.',
            reward: 1000,
            status:{
                completed: false,
                received: false
            },
            condition: 500
        },
        {
            id: 13,
            name: 'Buy 4 car.',
            reward: 10,
            status:{
                completed: false,
                received: false
            },
            condition: 3
        }
    ],
    [
        {
            id: 14,
            name: 'Login today',
            reward: 5,
            status:{
                completed: false,
                received: false
            },
            condition: 0
        },
        {
            id: 15,
            name: 'Play 500 race.',
            reward: 850,
            status:{
                completed: false,
                received: false
            },
            condition: 500
        },
        {
            id: 16,
            name: 'Play a multiplayer Race',
            reward: 50,
            status:{
                completed: false,
                received: false
            },
            condition: 0
        },
        {
            id: 17,
            name: 'Win 100 races.',
            reward: 2000,
            status:{
                completed: false,
                received: false
            },
            condition: 99
        },
        {
            id: 18,
            name: 'Complete 500 races',
            reward: 2000,
            status:{
                completed: false,
                received: false
            },
            condition: 499
        },
        {
            id: 19,
            name: 'Complete 1500 laps.',
            reward: 2000,
            status:{
                completed: false,
                received: false
            },
            condition: 1499
        },
        {
            id: 20,
            name: 'Buy 10 car.',
            reward: 5000,
            status:{
                completed: false,
                received: false
            },
            condition: 9
        }
    ]
]

