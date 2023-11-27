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

router.get('/:userID', async (request, response) => {
    let usersPokemon = await getOneUsersPokemon(request.params.pokemonID)

    response.json({
        pokemon: usersPokemon
    })
})

router.get('/:pokemonID', async (request, response) => {
    let pokemon = await getPokemonById(request.params.pokemonID)

    response.json({
        pokemon: pokemon
    })
})

router.post('/', async (request, response) => {
    let pokemon = await createPokemon(request.body.pokemonDetails) 

    response.json({
        pokemon: pokemon
    })
})

router.put('/pokemonID', async (request, response) => {
    let pokemonDetails = {
        pokemonID: request.params.pokemonID,
        newData: request.body.newPokemonData
    }
})

router.delete('/:pokemonID'), async (request, response) => {
    response.json(
        await deletePokemon(request.params.pokemonID)
    )
}

module.exports = router