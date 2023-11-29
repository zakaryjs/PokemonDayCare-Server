const { Pokemon } = require('../models/PokemonModel')

async function getAllPokemon(){
    return await Pokemon.find({}).exec()
}

async function getPokemonById(pokemonId){
    return await Pokemon.findById(pokemonId).exec()
}

async function getOneUsersPokemon(userId) {
    return await Pokemon.find({user: userId}).exec()
}

async function createPokemon(pokemonDetails) {
    return await Pokemon.create(pokemonDetails)
}

async function updatePokemon(pokemonDetails){
    return await Pokemon.findByIdAndUpdate(pokemonDetails.user, pokemonDetails.updatedData, {returnDocument: 'after'}).exec();
}

async function deletePokemon(pokemonID){
    return await Pokemon.findByIdAndDelete(pokemonID).exec();
}

module.exports = {
    getAllPokemon, getPokemonById, getOneUsersPokemon, createPokemon, updatePokemon, deletePokemon
}