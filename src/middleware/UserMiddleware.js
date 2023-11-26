const jwt = require('jsonwebtoken')
const { verifyUserJWT, decryptString } = require('../controllers/UserFunctions')


const jwtInHeader = async (request, response, next) => {
    let headerJwt = request.headers.jwt
    let newJwt = await verifyUserJWT(headerJwt)

    request.headers.jwt = newJwt

    next()
}

const verifyJwtRole = async (request, response, next) => {
    let verifiedUserJwt = jwt.verify(request.headers.jwt, process.env.JWT_SECRET, {complete: true})

    let decryptedJwtToParse = decryptString(verifiedUserJwt.payload.data)

    let parsedData = JSON.parse(decryptedJwtToParse)

    if (parsedData.isAdmin) {
        request.headers.isAdmin = parsedData.isAdmin
        console.log('this user is admin')
    }

    next()
}

const adminOnly = async (request, response, next) => {
    if (request.headers.isAdmin) {
        next()
    } else {
        next(new Error('Only admins can access this route!'))
    }
}

module.exports = {
    jwtInHeader, verifyJwtRole, adminOnly
}