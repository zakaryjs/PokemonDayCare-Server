const request = require('supertest')
const {app} = require('../server')

const {User} = require('../models/UserModel')
const {deleteUserByEmail} = require('../controllers/UserFunctions')
const {deletePokemonByNickname} = require('../controllers/PokemonFunctions')
const {deleteAppointmentByType} = require('../controllers/AppointmentFunctions')

const {databaseConnect, databaseDisconnect} = require('../database')

beforeAll(async () => {
    await databaseConnect(process.env.DB_URI)

    email = 'appointment@email.com'

    await deleteUserByEmail(email)

    nickname = 'appointment'

    await deletePokemonByNickname(nickname)

    type = 'Test'

    await deleteAppointmentByType(type)
})

beforeEach(async () => {
    jest.setTimeout(10000)
})

afterAll(async () => {
    await databaseDisconnect()
})

test('User gets created', async () => {
    const response = await request(app).post('/users/register').send({
        firstName: 'appointment',
        lastName: 'Test',
        password: 'appointment123',
        email: 'appointment@email.com'
    })

    expect(response.status).toBe(201)
    expect(response.body.user.email).toBe('appointment@email.com')
})

test('User can login with valid details', async () => {
    const response = await request(app).post('/users/login').send({
        email: 'appointment@email.com',
        password: 'appointment123'
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
        nickname: 'appointment',
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

test ('appointment can be created', async () => {
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
        nickname: 'appointment',
        gender: 'male',
        height: 45,
        weight: 45,
        notes: 'test subject',
        user: userId
    })

    expect(createPokemon.body).toHaveProperty('pokemon')
    const pokemonId = createPokemon.body.pokemon._id

    const createAppointment = await request(app).post('/appointment')
    .set('Cookie', [`jwt=${jwtToken}`])
    .send({
        dropOffDate: '2024-01-03T16:00:00.000+00:00',
        pickUpDate: '2024-01-03T16:00:00.000+00:00',
        typeOfAppointment: "Test",
        pokemon: pokemonId,
        user: userId
    })

    expect(createAppointment.status).toBe(200)
    expect(createAppointment.body.appointment).toHaveProperty('typeOfAppointment')
})

test ('all users appointments can be found', async () => {
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

    const findByUser = await request(app).get(`/appointment/${userId}`)
    .set('Cookie', [`jwt=${jwtToken}`, `isAdmin=${isAdmin}`])

    expect(findByUser.body).toHaveProperty('appointments')
    expect(findByUser.body).toHaveProperty('appointments[0]')
})