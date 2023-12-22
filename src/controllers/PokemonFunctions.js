const { Pokemon } = require('../models/PokemonModel')

//@desc gets all pokemon from database
//@access protected
async function getAllPokemon(){
    return await Pokemon.find({}).exec()
}

//@desc gets a single pokemon by pokemon id
//@access protected
async function getPokemonById(pokemonId){
    return await Pokemon.findById(pokemonId).exec()
}

//@desc gets a single users pokemon by user id
//@access protected
async function getOneUsersPokemon(userId) {
    return await Pokemon.find({user: userId})
}

//@desc creates an pokemon to be stored in the database
//@access protected
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

//@desc updates a pokemon to reflect changes as requested by the user
//@access protected
async function updatePokemon(pokemonDetails){
    return await Pokemon.findByIdAndUpdate(pokemonDetails.pokemonID, pokemonDetails.updatedData, {returnDocument: 'after'}).exec();
}

//@desc deletes pokemon from database by ID
//@access protected
async function deletePokemon(pokemonID){
    return await Pokemon.findByIdAndDelete(pokemonID).exec();
}

//@desc deletes pokemon from database by nickname
//@access protected
async function deletePokemonByNickname(nickname){
    return await Pokemon.deleteOne({nickname})
}

module.exports = {
    getAllPokemon, getPokemonById, getOneUsersPokemon, createPokemon, updatePokemon, deletePokemon, deletePokemonByNickname
}