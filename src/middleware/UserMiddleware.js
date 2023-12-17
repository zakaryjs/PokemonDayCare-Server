const jwt = require('jsonwebtoken')
const { verifyUserJWT, decryptString } = require('../controllers/UserFunctions')


const jwtInHeader = async (request, response, next) => {
    try {
        let headerJwt = request.cookies.jwt
        let newJwt = await verifyUserJWT(headerJwt)
    
        request.cookies.jwt = newJwt
    
        next()
    } catch (err) {console.log(err)}
    
}

const adminOnly = async (request, response, next) => {
    let isAdmin = request.cookies.isAdmin

    if (isAdmin === 'true') {
        next()
    } else {
        next(new Error('Only admins can access this route!'))
    }
}

module.exports = {
    jwtInHeader, adminOnly
}