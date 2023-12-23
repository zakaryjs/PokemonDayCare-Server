const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { databaseConnect } = require("./database")
const { User } = require("./models/UserModel")

dotenv.config

const users = [
    {
        firstName: 'jimmy',
        lastName: 'test',
        email: 'jimmy@mail.com',
        password: 'jimmy123'
    },
    {
        firstName: 'admin',
        lastName: 'test',
        email: 'adminuser@mail.com',
        password: 'admin123',
        isAdmin: true
    }
]

async function seedDatabase() {
    await mongoose.connect('mongodb://localhost:27017/pokemondaycare').then(async () => {
        await User.insertMany(users)
    }).then(() => {
        mongoose.connection.close()
    })
}

seedDatabase()