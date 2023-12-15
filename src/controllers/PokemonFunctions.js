const { Pokemon } = require('../models/PokemonModel')

async function getAllPokemon(){
    return await Pokemon.find({}).exec()
}

async function getPokemonById(pokemonId){
    return await Pokemon.findById(pokemonId).exec()
}

async function getOneUsersPokemon(userId) {
    return await Pokemon.find({user: userId})
}

async function createPokemon(pokemonDetails) {
    let newPokemon = new Pokemon(
        {
            species: pokemonDetails.species,
            nickname: pokemonDetails.nickname,
            gender: pokemonDetails.gender,
            height: pokemonDetails.height,
            weight: pokemonDetails.weight,
            notes: pokemonDetails.notes,
            user: pokemonDetails.user
        }
    )
    return await newPokemon.save()
}

async function updatePokemon(pokemonDetails){
    return await Pokemon.findByIdAndUpdate(pokemonDetails.pokemonID, pokemonDetails.updatedData, {returnDocument: 'after'}).exec();
}

async function deletePokemon(pokemonID){
    return await Pokemon.findByIdAndDelete(pokemonID).exec();
}

module.exports = {
    getAllPokemon, getPokemonById, getOneUsersPokemon, createPokemon, updatePokemon, deletePokemon
}