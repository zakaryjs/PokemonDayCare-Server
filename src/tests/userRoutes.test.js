const request = require('supertest')
const {app} = require('../server')

const {User} = require('../models/UserModel')
const {deleteUserByEmail} = require('../controllers/UserFunctions')

const {databaseConnect, databaseDisconnect} = require('../database')

beforeAll(async () => {
    await databaseConnect(process.env.DB_URI)

    email = 'zakarytestemail@email.com'

    await deleteUserByEmail(email)
})

beforeEach(async () => {
    jest.setTimeout(10000)
})

afterAll(async () => {
    await databaseDisconnect()
})

test('User gets created', async () => {
    const response = await request(app).post('/users/register').send({
        firstName: 'Zakary',
        lastName: 'Test',
        password: 'TestPassword',
        email: 'zakarytestemail@email.com'
    })

    expect(response.status).toBe(201)
    expect(response.body.user.email).toBe('zakarytestemail@email.com')
})

test('User cannot create an account with a duplicate email', async () => {
    const response = await request(app).post('/users/register').send({
        firstName: 'Zakary',
        lastName: 'Test',
        password: 'TestPassword',
        email: 'zakarytestemail@email.com'
    })

    expect(response.status).toBe(400)
})

test('User can login with valid details', async () => {
    const response = await request(app).post('/users/login').send({
        email: 'zakarytestemail@email.com',
        password: 'TestPassword'
    })

    expect(response.status).toBe(200)
})

test('User cannot login with invalid details', async () => {
    const response = await request(app).post('/users/login').send({
        email: 'wrongemail@email.com',
        password: 'WrongPassword'
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Invalid user details provided.")
})

test('User can logout', async () => {
    const response = await request(app).post('/users/logout').send({})

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("logged out")
})