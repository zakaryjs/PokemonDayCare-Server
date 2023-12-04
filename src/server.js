const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()


const cors = require('cors')
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3000/"],
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const HOST = process.env.HOST
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mongoose = require('mongoose')
var databaseUrl = process.env.DB_URI

const {databaseConnect} = require('./database')
databaseConnect(databaseUrl).then(() => {
    console.log('Database is connected successfully.')
})

const usersController = require("./controllers/UserRoutes")
app.use("/users", usersController)

const pokemonController = require("./controllers/PokemonRoutes")
app.use("/pokemon", pokemonController)

const appointmentController = require("./controllers/AppointmentRoutes")
app.use("/appointment", appointmentController)

app.get('/', (request, response) => {
    response.json({
        message: "Hello world! The server is working :)"
    })
})

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