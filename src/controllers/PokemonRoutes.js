const express = require('express')

const router = express.Router()

const { Pokemon } = require('../models/PokemonModel')

const {
    getAllPokemon, getPokemonById, getOneUsersPokemon, createPokemon, updatePokemon, deletePokemon
} = require('./PokemonFunctions')

const {
    jwtInHeader, adminOnly
} = require('../middleware/UserMiddleware')

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