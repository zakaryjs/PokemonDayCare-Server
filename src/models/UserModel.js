const mongoose = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name.'],
        unique: false,
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name.'],
        unique: false,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        unique: false
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }