const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

// declares whitelisted domains
const cors = require('cors')
const corsOptions = {
	origin: ["http://localhost:3000", "http://localhost:3000/", "https://localhost:3000", "https://localhost:3000/", "https://pokemon-daycare.netlify.app/", 
    "https://pokemon-daycare.netlify.app", "https://pokemondaycare.tech", "https://www.pokemondaycare.tech"],
	optionsSuccessStatus: 200,
    credentials: true,
    cookie: {
        sameSite: 'none',
        secure: true
    }
}
app.use(cors(corsOptions));

// allows server to access cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const HOST = process.env.HOST
const PORT = process.env.PORT

// allows server to read and return JSON
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mongoose = require('mongoose')
var databaseUrl = process.env.DB_URI

// connects server to database
const {databaseConnect} = require('./database')
databaseConnect(databaseUrl).then(() => {
    console.log('Database is connected successfully.')
})

// controller imports

const usersController = require("./controllers/UserRoutes")
app.use("/users", usersController)

const pokemonController = require("./controllers/PokemonRoutes")
app.use("/pokemon", pokemonController)

const appointmentController = require("./controllers/AppointmentRoutes")
app.use("/appointment", appointmentController)

// base route to check if server is working
app.get('/', (request, response) => {
    response.json({
        message: "Hello world! The server is working :)"
    })
})

// route for invalid routes
app.get('*', (request, response) => {
    response.status(404).json({
        message: "There are no routes with that path.",
        requestPath: request.path
    })
})

module.exports = {
    HOST,
    PORT,
    app
}