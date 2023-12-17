const express = require('express')

const router = express.Router()

const { Pokemon } = require('../models/PokemonModel')

const {
    getAllPokemon, getPokemonById, getOneUsersPokemon, createPokemon, updatePokemon, deletePokemon
} = require('./PokemonFunctions')

const {
    jwtInHeader, verifyJwtRole, adminOnly
} = require('../middleware/UserMiddleware')

router.get('/all', async (request, response) => {
    let allPokemon = await getAllPokemon()

    response.json({
        pokemon: allPokemon
    })
})

router.get('/:userID', jwtInHeader, async (request, response) => {
    const result = await Pokemon.find({user: request.params.userID})

    response.json({
        pokemon: result
    })
})

router.get('/find/:pokemonID', async (request, response) => {
    let pokemon = await Pokemon.find({_id: request.params.pokemonID})

    response.json({
        pokemon: pokemon
    })
})

router.post('/', async (request, response) => {
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
})

router.put('/:pokemonID', async (request, response) => {
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
})

router.delete('/:pokemonID', async (request, response) => {
    response.json(
        await deletePokemon(request.params.pokemonID)
    )
})

module.exports = router