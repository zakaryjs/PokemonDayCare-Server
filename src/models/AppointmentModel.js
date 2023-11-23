const mongoose = require('mongoose')

const AppointmentSchema = new Mongoose.Schema({
    dropOffDate: {
        type: Date,
        required: true,
        unique: false
    },
    pickUpDate: {
        type: Date,
        required: true,
        unique: false
    },
    typeOfAppointment: {
        type: String,
        required: true,
        unique: false
    },
    pokemon: {
        type: mongoose.Types.ObjectId,
        ref: 'Pokemon'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Appointment = mongoose.model('Appointment', AppointmentSchema)

module.exports = { Appointment }