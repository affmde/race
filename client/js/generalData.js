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
        acceleration: 90,
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
        id: 10,
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
        id: 11,
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
        id: 12,
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
        id: 13,
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

