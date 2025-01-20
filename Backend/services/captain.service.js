const CaptainModel = require('../models/captain.model');
const { errorResponse } = require('../utils/response');

module.exports.createCaptain = async function({
    firstName,
    lastName,
    email,
    password,
    status,
    color,
    plate,
    capacity,
    vehicleType,    
}){
    if (!firstName || !email || !password || !status || !color || !plate || !capacity || !vehicleType) {        
        throw new Error("All fields are required");          
    }

    const newCaptainUser = CaptainModel.create({
        fullName: {
            firstName, 
            lastName
        },
        email,
        password,
        status,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,            
        },        
    });

    return newCaptainUser

};