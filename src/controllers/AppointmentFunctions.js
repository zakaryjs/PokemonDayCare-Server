const { Appointment } = require('../models/AppointmentModel')

async function getAllAppointments(){
    return await Appointment.find({}).exec()
}

async function getAppointmentById(appointmentId){
    return await Appointment.findById(appointmentId).exec()
}

async function getOneUsersAppointments(userId) {
    return await Appointment.find({user: userId}).exec()
}

async function createAppointment(appointmentDetails) {
    
    let newAppointment = new Appointment(
        {
            dropOffDate: appointmentDetails.dropOffDate,
            pickUpDate: appointmentDetails.pickUpDate,
            typeOfAppointment: appointmentDetails.typeOfAppointment,
            pokemon: appointmentDetails.pokemon,
            user: appointmentDetails.user
        }
    )
    return await newAppointment.save()
}

async function updateAppointment(appointmentDetails){
    return await Appointment.findByIdAndUpdate(appointmentDetails.user, appointmentDetails.updatedData, {returnDocument: 'after'}).exec();
}

async function deleteAppointment(appointmentID){
    return await Appointment.findByIdAndDelete(appointmentID).exec();
}

module.exports = {
    getAllAppointments, getAppointmentById, getOneUsersAppointments, createAppointment, updateAppointment, deleteAppointment
}