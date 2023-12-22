// required imports

const express = require('express')

const router = express.Router()

const { Pokemon } = require('../models/PokemonModel')

const {
    getAllPokemon, getPokemonById, getOneUsersPokemon, createPokemon, updatePokemon, deletePokemon
} = require('./PokemonFunctions')

const {
    jwtInHeader, adminOnly
} = require('../middleware/UserMiddleware')

//@desc gets all pokemon from database
//@route /pokemon/all
//@access protected
router.get('/all', jwtInHeader, adminOnly, async (request, response) => {
    try {
        let allPokemon = await getAllPokemon()

    response.json({
        pokemon: allPokemon
    })
    } catch (error) {
        response.status(400).json({
            error: error
        })
    }
})

//@desc gets a single users pokemon by user id
//@route /pokemon/:userID
//@access protected
router.get('/:userID', jwtInHeader, async (request, response) => {
    try {
        const result = await Pokemon.find({user: request.params.userID})

        response.json({
            pokemon: result
        })
    } catch (error) {
        response.status(400).json({
            error: error
        })
    }    
})

//@desc gets a single pokemon by pokemon id
//@route /pokemon/find/:pokemonID
//@access protected
router.get('/find/:pokemonID', jwtInHeader, async (request, response) => {
    try {
        let pokemon = await Pokemon.find({_id: request.params.pokemonID})

        response.json({
            pokemon: pokemon
        })
    } catch (error) {
        response.status(400).json({
            error: error
        })
    }   
})

//@desc creates an pokemon to be stored in the database
//@route /pokemon/
//@access protected
router.post('/', jwtInHeader, async (request, response) => {
    try {
        let pokemonDetails = {
            species: request.body.species,
            nickname: request.body.nickname,
            gender: request.body.gender,
            height: request.body.height,
            weight: request.body.weight,
            notes: request.body.notes,
            user: request.body.user
        }
        let newPokemon = await createPokemon(pokemonDetails)
    
        response.json({
            pokemon: newPokemon
        })
    } catch (error) {
        response.status(400).json({
            error: error
        })
    }    
})

//@desc updates a pokemon to reflect changes as requested by the user
//@route /pokemon/:pokemonID
//@access protected
router.put('/:pokemonID', jwtInHeader, async (request, response) => {
    try {
        let pokemonDetails = {
            pokemonID: request.params.pokemonID,
            updatedData: {
                species: request.body.species,
                nickname: request.body.nickname,
                gender: request.body.gender,
                height: request.body.height,
                weight: request.body.weight,
                notes: request.body.notes,
            }
        }
    
        response.json(await updatePokemon(pokemonDetails))
    } catch (error) {
        response.status(400).json({
            error: error
        })
    }
})

//@desc deletes pokemon from database by ID
//@route /pokemon/:pokemonID
//@access protected
router.delete('/:pokemonID', jwtInHeader, async (request, response) => {
    try {
        response.json(
            await deletePokemon(request.params.pokemonID)
        )
    } catch (error) {
        response.status(400).json({
            error: error
        })
    }    
})

module.exports = router