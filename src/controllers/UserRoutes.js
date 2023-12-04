const express = require('express')

const router = express.Router()

const { User } = require('../models/UserModel')

const {
    encryptString, decryptString, decryptObject, hashString, validateHashedData, 
    generateJWT, generateUserJWT, verifyUserJWT, createUser, updateUser, deleteUser, errorHandler
} = require('./UserFunctions')

const {
    jwtInHeader, verifyJwtRole, adminOnly
} = require('../middleware/UserMiddleware')

router.post('/register', async (request, response) => {

    if (request.body.password.length < 8) {
        return response.status(400).json({
            error: 'Password must be at least 8 characters.'
        })
    }

    try {
        let userDetails = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            password: request.body.password,
            email: request.body.email,
            isAdmin: request.body.isAdmin
        }
        let newUser = await createUser(userDetails)
    
        response.status(201).json({
            user: newUser
        })
    } catch (error) {
        response.status(400).json({
            error: 'Error creating user'
        })
    }
})

router.post('/login', async (request, response) => {
    let targetUser = await User.findOne({email: request.body.email}).exec()

    if (await validateHashedData(request.body.password, targetUser.password)){
        let encryptedUserJwt = await generateUserJWT(
            {
                userID: targetUser.id,
                email: targetUser.email,
                password: targetUser.password,
                isAdmin: targetUser.isAdmin
            }
        )
        
        response.cookie('jwt', encryptedUserJwt, {  maxAge: 7*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none' })
        if (targetUser.isAdmin) {
            response.cookie('isAdmin', true, {  maxAge: 7*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none' })
        }
        response.json(encryptedUserJwt)
        

    } else {
        response.status(400).json({message:"Invalid user details provided."})
    }
})

router.put('/:userID', jwtInHeader, verifyJwtRole, adminOnly, async (request, response) => {

    if (request.body.password.length < 8) {
        return response.status(400).json({
            error: 'Password must be at least 8 characters.'
        })
    }

    let userDetails = {
        userID: request.params.userID,
        updatedData: {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: await hashString(request.body.password)
        }
    }

    response.json(await updateUser(userDetails))
})

router.delete('/:userID', jwtInHeader, verifyJwtRole, adminOnly, async (request, response) => {
    response.json(await deleteUser(request.params.userID))
})

module.exports = router