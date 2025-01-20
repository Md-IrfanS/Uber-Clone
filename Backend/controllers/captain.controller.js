const { validationResult } = require('express-validator');
const CaptainModel = require('../models/captain.model');
const { errorResponse, sendResponse } = require('../utils/response');
const { createCaptain } = require('../services/captain.service');


module.exports.registerCaptain = async function (req, res, next) {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, 400, 'Fields required');
        }

        const {fullName: {firstName, lastName}, email, password, status, vehicle: {color, plate, capacity, vehicleType}} = req.body;

        const isCaptainAlreadyExist = await CaptainModel.findOne({email});
        
        if (isCaptainAlreadyExist) {
            return errorResponse(res, 400, 'Captain already exist');
        }

        const hashedPassword = await CaptainModel.hashPassword(password);

        const captain = await createCaptain({firstName, lastName, email, password: hashedPassword, status, color, plate, capacity, vehicleType});

        const token = captain.generateAuthToken();

        return sendResponse(res, 201, 'Registered Captain', {token, captain});

    }catch(error){
        return errorResponse(res, 400, 'Failed to create user', error);
    }
};