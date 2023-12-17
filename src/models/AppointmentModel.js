const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
    dropOffDate: {
        type: Date,
        required: [true, 'Please enter a drop off date.'],
        unique: false
    },
    pickUpDate: {
        type: Date,
        required: [true, 'Please enter a pick up date.'],
        unique: false
    },
    typeOfAppointment: {
        type: String,
        required: [true, 'Please enter a type of appointment.'],
        unique: false
    },
    pokemon: {
        type: mongoose.Types.ObjectId,
        ref: 'Pokemon',
        required: [true, 'Please select a pokemon.']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User required.']
    }
})

const Appointment = mongoose.model('Appointment', AppointmentSchema)

module.exports = { Appointment }