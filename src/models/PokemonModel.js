const mongoose = require('mongoose')

const PokemonSchema = new mongoose.Schema({
    species: {
        type: String,
        required: true,
        unique: false
    },
    nickname: {
        type: String,
        required: true,
        unique: false
    },
    gender: {
        type: String,
        required: true,
        unique: false
    },
    height: {
        type: Number,
        required: true,
        unique: false
    },
    weight: {
        type: Number,
        required: true,
        unique: false
    },
    notes: {
        type: String,
        required: false,
        unique: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Pokemon = mongoose.model('Pokemon', PokemonSchema)

module.exports = { Pokemon }