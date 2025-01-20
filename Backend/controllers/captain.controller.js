const { validationResult } = require('express-validator');
const CaptainModel = require('../models/captain.model');
const { errorResponse, sendResponse } = require('../utils/response');
const { createCaptain } = require('../services/captain.service');
const BlackListTokenModel = require('../models/blackListToken.model');


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

// Get token from model, create cookie and send response
const sendTokenResponse = (res, captain, statusCode, message) => {
    const token = captain.generateAuthToken();
    const options = {
        expires: new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false
    };
    return res.status(statusCode).cookie('token', token, options).json({statusCode, message, details: {token, captain}});
};

module.exports.loginCaptain = async function (req, res, next) {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, 400, 'Fields are required', {errors: errors.array()})
        }
        const {email, password} = req.body;

        const captain = await CaptainModel.findOne({ email: email.toLowerCase() }).select("+password");
        console.log(captain)

        if (!captain) {
            return errorResponse(res, 401, 'Invalid credentails');
        }

        const isMatch = await captain.comparePassword(password);
        console.log(isMatch)
        if (!isMatch) {
            return errorResponse(res, 401, 'Invalid credentails');
        }
        

        return sendTokenResponse(res, captain, 200, 'Login successfully');

    }catch(error){
        console.error("Error during login:", error);
    return errorResponse(res, 500, "Internal server error");
    }
};


module.exports.getCaptainProfile = async function (req, res, next) {
    try {
        return sendResponse(res, 200, {captain: req.captain});
    } catch (error) {
        return errorResponse(res, 400);
    }
};


module.exports.captainLogout = async function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1] || req.cookies.token;
    await BlackListTokenModel.create({token});
    res.clearCookie('token');
    return sendResponse(res, 200, 'Captain Logged out');

};