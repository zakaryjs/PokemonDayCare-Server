const express = require('express')

const router = express.Router()

const { User } = require('../models/UserModel')

const {
    encryptString, decryptString, decryptObject, hashString, validateHashedData, 
    generateJWT, generateUserJWT, verifyUserJWT, createUser, updateUser, deleteUser, errorHandler, getSpecificUser
} = require('./UserFunctions')

const {
    jwtInHeader, adminOnly
} = require('../middleware/UserMiddleware')

const jwt = require('jsonwebtoken')

//@desc creates a user to be stored in the database
//@route /users/register
router.post('/register', async (request, response) => {

    if (request.body.password.length < 8) {
        return response.status(400).json({
            error: {
                errorMessage: 'Password must be at least 8 characters.'
            }
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
            error: error
        })
    }
})

//@desc compares details sent to server with those in database. If valid user is logged in
//@route /users/login
router.post('/login', async (request, response) => {
    try {
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
            response.cookie('isAdmin', false, {  maxAge: 7*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none' })
            if (targetUser.isAdmin) {
                response.cookie('isAdmin', true, {  maxAge: 7*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none' })
            }
            response.json(encryptedUserJwt)
            
    
        } else {
            response.status(400).json({message:"Invalid user details provided."})
        }
    } catch (error) {
        response.status(400).json({message:"Invalid user details provided."})
    }
    
})

//@desc creates cookies which expire instantly in order to logout the user
//@route /users/logout
router.post('/logout', async (request, response) => {
    response.cookie('jwt', 'jwtLogOut', {  maxAge: 1, httpOnly: true, secure: true, sameSite: 'none' })
    response.cookie('isAdmin', false, {  maxAge: 1, httpOnly: true, secure: true, sameSite: 'none' })

    response.json({message: 'logged out'})
})

//@desc verifies and refreshes the user jwt as well as admin status
//@route /users/token-refresh 
router.post('/token-refresh', async(request, response) => {
    try {
        let oldToken = request.cookies.jwt;
        let refreshResult = await verifyUserJWT(oldToken).catch(error => {return {error: error.message}})
        let isAdmin = request.cookies.isAdmin
        
        let verifiedUserJwt = jwt.verify(refreshResult, process.env.JWT_SECRET, {complete: true})
    
        let decryptedJwtToParse = decryptString(verifiedUserJwt.payload.data)
    
        let parsedData = JSON.parse(decryptedJwtToParse)
    
        if (isAdmin === 'true') {
            response.json({
                jwt: refreshResult,
                isAdmin: isAdmin,
                user: parsedData
            })
        }
        if (isAdmin === 'false') {
            response.json({
                jwt: refreshResult,
                user: parsedData
            });
        }
    } catch (error) {
        response.json({
            error: 'no user found'
        })
    }
    
})

//@desc NOT USED
// router.put('/:userID', jwtInHeader, verifyJwtRole, adminOnly, async (request, response) => {

//     if (request.body.password.length < 8) {
//         return response.status(400).json({
//             error: 'Password must be at least 8 characters.'
//         })
//     }

//     let userDetails = {
//         userID: request.params.userID,
//         updatedData: {
//             firstName: request.body.firstName,
//             lastName: request.body.lastName,
//             email: request.body.email,
//             password: await hashString(request.body.password)
//         }
//     }

//     response.json(await updateUser(userDetails))
// })

// router.delete('/:userID', jwtInHeader, verifyJwtRole, adminOnly, async (request, response) => {
//     response.json(await deleteUser(request.params.userID))
// })

//@desc gets user details from ID
//@route /users/:userID
router.get('/:userID', jwtInHeader, async (request, response) => {
    response.json(await getSpecificUser(request.params.userID));
})

module.exports = router
