// import the appointment model
const { Appointment } = require('../models/AppointmentModel')

//@desc gets all appointments from database
//@access protected
async function getAllAppointments(){
    return await Appointment.find({}).populate("pokemon").populate("user").exec()
}

//@desc gets a single appointment by appointment id
//@access protected
async function getAppointmentById(appointmentId){
    return await Appointment.findById(appointmentId).exec()
}

//@desc gets a single users appointments by user id
//@access protected
async function getOneUsersAppointments(userId) {
    return await Appointment.find({user: userId}).exec()
}

//@desc creates an appointment to be stored in the database
//@access protected
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

//@desc updates an appointment to reflect changes as requested by the user
//@access protected
async function updateAppointment(appointmentDetails){
    return await Appointment.findByIdAndUpdate(appointmentDetails.user, appointmentDetails.updatedData, {returnDocument: 'after'}).exec();
}

//@desc deletes appointment from database
//@access protected
async function deleteAppointment(appointmentID){
    return await Appointment.findByIdAndDelete(appointmentID).exec();
}

//@desc deletes appointment from database
//@access protected
async function deleteAppointmentByType(typeOfAppointment){
    return await Appointment.deleteOne({typeOfAppointment})
}

module.exports = {
    getAllAppointments, getAppointmentById, getOneUsersAppointments, createAppointment, updateAppointment, deleteAppointment, deleteAppointmentByType
}