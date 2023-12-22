// required imports

const express = require('express')

const router = express.Router()

const { Appointment } = require('../models/AppointmentModel')

const {
    getAllAppointments, getAppointmentById, getOneUsersAppointments, createAppointment, updateAppointment, deleteAppointment
} = require('./AppointmentFunctions')

const {
    jwtInHeader, adminOnly
} = require('../middleware/UserMiddleware')

//@desc gets all appointments from database
//@route /appointment/all
//@access protected
router.get('/all', jwtInHeader, adminOnly, async (request, response) => {
    let allAppointments = await getAllAppointments()

    response.json({
        appointments: allAppointments
    })
})

//@desc gets a single users appointments by user id
//@route /appointment/:userID
//@access protected
router.get('/:userID', jwtInHeader, async (request, response) => {
    try {
        const usersAppointments = await Appointment.find({user: request.params.userID}).populate("pokemon").populate("user")

        response.json({
            appointments: usersAppointments
        })
    } catch (error) {
        response.status(400).json({
            error: error
        })
    }
})


//@desc NOT USED
// router.get('/:appointmentID', async (request, response) => {
//     let appointment = await getAppointmentById(request.params.appointmentID)

//     response.json({
//         appointment: appointment
//     })
// })

//@desc creates an appointment to be stored in the database
//@route /appointment/
//@access protected
router.post('/', jwtInHeader, async (request, response) => {
    try {
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
    } catch (error) {
        response.status(400).json({
            error: error
        })
    }    
})

//@desc NOT USED
// router.put('/appointmentID', jwtInHeader, verifyJwtRole, async (request, response) => {
//     let appointmentDetails = {
//         appointmentID: request.params.appointmentID,
//         updatedData: {
//             dropOffDate: request.body.dropOffDate,
//             pickUpDate: request.body.pickUpDate,
//             typeOfAppointment: request.body.typeOfAppointment,
//             pokemon: request.body.pokemon,
//         }
//     }

//     response.json(await updateAppointment(appointmentDetails))
// })

//@desc deletes appointment from database
//@route /appointment/:appointmentID
//@access protected
router.delete('/:appointmentID', jwtInHeader, async (request, response) => {
    try {
        response.json(
            await deleteAppointment(request.params.appointmentID)
        )
    } catch (error) {
        response.status(400).json({
            error: error
        })
    }
})

module.exports = router