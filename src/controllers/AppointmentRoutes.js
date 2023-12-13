const express = require('express')

const router = express.Router()

const { Appointment } = require('../models/AppointmentModel')

const {
    getAllAppointments, getAppointmentById, getOneUsersAppointments, createAppointment, updateAppointment, deleteAppointment
} = require('./AppointmentFunctions')

const {
    jwtInHeader, verifyJwtRole, adminOnly
} = require('../middleware/UserMiddleware')

router.get('/all', async (request, response) => {
    let allAppointments = await getAllAppointments()

    response.json({
        appointments: allAppointments
    })
})

router.get('/:userID', async (request, response) => {
    const usersAppointments = await Appointment.find({user: request.params.userID}).populate("pokemon").populate("user")

    response.json({
        appointments: usersAppointments
    })
})

// router.get('/:appointmentID', async (request, response) => {
//     let appointment = await getAppointmentById(request.params.appointmentID)

//     response.json({
//         appointment: appointment
//     })
// })

router.post('/', async (request, response) => {
    let appointmentDetails = {
        dropOffDate: request.body.dropOffDate,
        pickUpDate: request.body.pickUpDate,
        typeOfAppointment: request.body.typeOfAppointment,
        pokemon: request.body.pokemon,
        user: request.body.user
    }
    let newAppointment = await createAppointment(appointmentDetails)

    response.json({
        appointment: newAppointment
    })
})

router.put('/appointmentID', jwtInHeader, verifyJwtRole, async (request, response) => {
    let appointmentDetails = {
        appointmentID: request.params.appointmentID,
        updatedData: {
            dropOffDate: request.body.dropOffDate,
            pickUpDate: request.body.pickUpDate,
            typeOfAppointment: request.body.typeOfAppointment,
            pokemon: request.body.pokemon,
        }
    }

    response.json(await updateAppointment(appointmentDetails))
})

router.delete('/:appointmentID'), jwtInHeader, verifyJwtRole, adminOnly, async (request, response) => {
    response.json(
        await deleteAppointment(request.params.appointmentID)
    )
}

module.exports = router