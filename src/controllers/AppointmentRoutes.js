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

router.get('/:appointmentID', async (request, response) => {
    let usersAppointments = await getOneUsersAppointments(request.params.appointmentID)

    response.json({
        appointments: usersAppointments
    })
})

router.get('/:appointmentID', async (request, response) => {
    let appointment = await getAppointmentById(request.params.appointmentID)

    response.json({
        appointment: appointment
    })
})

router.post('/', async (request, response) => {
    let appointment = await createAppointment(request.body.appointmentDetails) 

    response.json({
        appointment: appointment
    })
})

router.put('/appointmentID', jwtInHeader, verifyJwtRole, async (request, response) => {
    let appointmentDetails = {
        appointmentID: request.params.appointmentID,
        newData: request.body.newAppointmentData
    }
})

router.delete('/:appointmentID'), jwtInHeader, verifyJwtRole, adminOnly, async (request, response) => {
    response.json(
        await deleteAppointment(request.params.appointmentID)
    )
}

module.exports = router