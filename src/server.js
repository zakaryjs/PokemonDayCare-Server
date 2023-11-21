const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const HOST = process.env.HOST
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))

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