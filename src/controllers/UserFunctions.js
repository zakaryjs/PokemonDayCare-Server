const { User } = require('../models/UserModel')

const dotenv = require('dotenv')
dotenv.config()

const crypto = require('crypto')
let encAlgorithm = 'aes-256-cbc'
let encPrivateKey = crypto.scryptSync(process.env.ENC_KEY, 'SpecialSalt', 32)
let encIV = crypto.scryptSync(process.env.ENC_IV, 'SpecialSalt', 16)
let cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV)
let decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV)

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const saltRounds = 15

function encryptString(data){
    cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV)
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
}

function decryptString(data){
    decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV)
    return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8')
}

function decryptObject(data){
    return JSON.parse(decryptString(data))
}

async function hashString(stringToHash){
    let saltToAdd = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(stringToHash, saltToAdd)
}

async function validateHashedData(providedUnhashedData, storedHashedData){
    return await bcrypt.compare(providedUnhashedData, storedHashedData)
}

function generateJWT(payloadObj){
    return jwt.sign(payloadObj, process.env.JWT_SECRET, { expiresIn: "7d"})
}

async function generateUserJWT(userDetails){
    let encryptedUserData = encryptString(JSON.stringify(userDetails))
    return generateJWT({data: encryptedUserData})
}

async function verifyUserJWT(userJWT){
    let userJwtVerified = jwt.verify(userJWT,process.env.JWT_SECRET, {complete: true})
    let decryptedJwtPayload = decryptString(userJwtVerified.payload.data)
    let userData = JSON.parse(decryptedJwtPayload)
    let targetUser = await User.findById(userData.userID).exec()
    if (targetUser.password == userData.password && targetUser.email == userData.email){
        return generateJWT({data: userJwtVerified.payload.data})
    } else {
        throw new Error({message: "Invalid user token."})
    }
}

async function createUser(userDetails){

    userDetails.hashedPassword = await hashString(userDetails.password)

    let newUser = new User(
        { 
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.hashedPassword,
            isAdmin: userDetails.isAdmin
        }
    )
    return await newUser.save()
}

async function updateUser(userDetails){
    return await User.findByIdAndUpdate(userDetails.userID, userDetails.updatedData, {returnDocument: 'after'}).exec()
}

async function deleteUser(userID){
    return await User.findByIdAndDelete(userID).exec()
}

function errorHandler(error) {
    console.log(error.message)
}

async function getSpecificUser(userID){
    return await User.findById(userID)
}

module.exports = {
    encryptString, decryptString, decryptObject, hashString, validateHashedData, 
    generateJWT, generateUserJWT, verifyUserJWT, createUser, updateUser, deleteUser, errorHandler, getSpecificUser
}