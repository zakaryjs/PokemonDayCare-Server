const request = require('supertest')
const {app} = require('../server')

const {User} = require('../models/UserModel')
const {deleteUserByEmail} = require('../controllers/UserFunctions')
const {deletePokemonByNickname} = require('../controllers/PokemonFunctions')

const {databaseConnect, databaseDisconnect} = require('../database')

beforeAll(async () => {
    await databaseConnect(process.env.DB_URI)

    email = 'pokemon@email.com'

    await deleteUserByEmail(email)

    nickname = 'billy'

    await deletePokemonByNickname(nickname)
})

afterAll(async () => {
    await databaseDisconnect()
})

test('User gets created', async () => {
    const response = await request(app).post('/users/register').send({
        firstName: 'pokemon',
        lastName: 'Test',
        password: 'pokemon123',
        email: 'pokemon@email.com'
    })

    expect(response.status).toBe(201)
    expect(response.body.user.email).toBe('pokemon@email.com')
})

test('User can login with valid details', async () => {
    const response = await request(app).post('/users/login').send({
        email: 'pokemon@email.com',
        password: 'pokemon123'
    })

    const jwt = response.body

    expect(response.status).toBe(200)
    expect(response.body)
})

test('pokemon can be created and found', async () => {
    const response = await request(app).post('/users/login').send({
        email: 'pokemon@email.com',
        password: 'pokemon123'
    })

    const jwtToken = response.body
    const isAdmin = 'false'

    const refresh = await request(app).post('/users/token-refresh/')
    .set('Cookie', [`jwt=${jwtToken}`, `isAdmin=${isAdmin}`])
    .send({})

    const userId = refresh.body.user.userID

    expect(response.status).toBe(200)
    expect(refresh.body).toHaveProperty('user')
    expect(refresh.body).toHaveProperty('jwt')

    const createPokemon = await request(app).post('/pokemon/')
    .set('Cookie', [`jwt=${jwtToken}`])
    .send({
        species: 'pikachu',
        nickname: 'billy',
        gender: 'male',
        height: 45,
        weight: 45,
        notes: 'test subject',
        user: userId
    })

    expect(createPokemon.body).toHaveProperty('pokemon')
    const pokemonId = createPokemon.body.pokemon._id

    const findPokemon = await request(app).get(`/pokemon/find/${pokemonId}`)
    .set('Cookie', [`jwt=${jwtToken}`])

    expect(findPokemon.body).toHaveProperty('pokemon')
    expect(findPokemon.body).toHaveProperty('pokemon[0]')
})

test ('all users pokemon can be found', async () => {
    const response = await request(app).post('/users/login').send({
        email: 'pokemon@email.com',
        password: 'pokemon123'
    })

    const jwtToken = response.body
    const isAdmin = 'false'

    const refresh = await request(app).post('/users/token-refresh/')
    .set('Cookie', [`jwt=${jwtToken}`, `isAdmin=${isAdmin}`])
    .send({})

    const userId = refresh.body.user.userID

    expect(response.status).toBe(200)
    expect(refresh.body).toHaveProperty('user')
    expect(refresh.body).toHaveProperty('jwt')

    const findByUser = await request(app).get(`/pokemon/${userId}`)
    .set('Cookie', [`jwt=${jwtToken}`, `isAdmin=${isAdmin}`])

    expect(findByUser.body).toHaveProperty('pokemon')
    expect(findByUser.body).toHaveProperty('pokemon[0]')
})