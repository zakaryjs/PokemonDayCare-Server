const mongoose = require('mongoose')

//@desc function that connects to the database using the provided URI
async function databaseConnect() {
    try {
        await mongoose.connect(process.env.DB_URI);
		console.log("Database connected");
    } catch (error) {
        console.log('failed to connect to database')
    }
}

//@desc function that disconnects from the database
async function databaseDisconnect() {
    try {
        await mongoose.connection.close()
    } catch (error) {
        console.log('failed to disconnect from database')
    }
}

module.exports = {
    databaseConnect,
    databaseDisconnect
}