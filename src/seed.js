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
        password: '$2b$15$yM8ysYCCwGYLniC9Z5dAqufXho75cN1akX1cYo9yZ0Fwr4sGCsUh.'
    },
    {
        firstName: 'admin',
        lastName: 'test',
        email: 'adminuser@mail.com',
        password: '$2b$15$1Rgg6Nna/tqDcwjGpvIl0u347hkq8mMOBJXgx.gDkEJJkJJJojRc6',
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