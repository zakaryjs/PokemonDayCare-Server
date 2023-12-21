const request = require('supertest')
const {app} = require('../server')

const {databaseConnect, databaseDisconnect} = require('../database')

beforeAll(async () => {
    await databaseConnect(process.env.DB_URI)
})

afterAll(async () => {
    await databaseDisconnect()
})

test('User gets created', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Hello world! The server is working :)')
})

test('Error route works', async () => {
    const response = await request(app).get('/narnia')
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('There are no routes with that path.')
})