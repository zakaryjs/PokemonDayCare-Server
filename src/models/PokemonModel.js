const mongoose = require('mongoose')

const PokemonSchema = new mongoose.Schema({
    species: {
        type: String,
        required: [true, 'Please select a species.'],
        unique: false
    },
    nickname: {
        type: String,
        required: [true, 'Please enter a nickname.'],
        unique: false
    },
    gender: {
        type: String,
        required: [true, 'Please enter a gender.'],
        unique: false
    },
    height: {
        type: Number,
        required: [true, 'Please enter a height.'],
        unique: false
    },
    weight: {
        type: Number,
        required: [true, 'Please enter a weight.'],
        unique: false
    },
    notes: {
        type: String,
        required: false,
        unique: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User required.']
    }
})

const Pokemon = mongoose.model('Pokemon', PokemonSchema)

module.exports = { Pokemon }