const UserModel = require('../models/user.model');
const { createUser } = require('../services/user.service');
const { validationResult } = require('express-validator');
const { sendResponse, errorResponse } = require('../utils/response');
const jwt = require('jsonwebtoken');
const BlackListTokenModel = require('../models/blackListToken.model');

module.exports.registerUser = async function (req, res, next) {
    try{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return errorResponse(res, 400, 'Fields required', errors.array());
        }

        const { fullName: { firstName, lastName}, email, password } = req.body;

        const isUserAlreadyExist = await UserModel.findOne({email});

        if (isUserAlreadyExist) {
            return errorResponse(res, 400, 'User already exist');
        }

        const hashPassword = await UserModel.hashPassword(password);

        const user = await createUser({firstName, lastName, email, password: hashPassword});

        const token = user.generateAuthToken();

        return sendResponse(res, 201, 'Registered user', {token, user});

    }catch(error){
        return errorResponse(res, 400, 'failed to create user', error);
    };
};

// Get token from model, create cookie and send response
const sendTokenResponse = (res, user, statusCode, message) => {
    const token = user.generateAuthToken();
    const options = {
        expires: new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false
    };
    return res.status(statusCode).cookie('token', token, options).json({statusCode, message, details: {token, user}});
};


module.exports.loginUser = async function (req, res, next) {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, 400, 'Fields required', errors.array());
        }

        const { email, password } = req.body;

        const user = await UserModel.findOne({email}).select('+password');
        
        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {            
            return errorResponse(res, 400, 'Invalid credentials')
        }        
        
        return sendTokenResponse(res, user, 200, 'Login successfully');        
    }catch(error){
        return errorResponse(res, 400, 'Invalid credentails', error);
    };
};


module.exports.getUserProfile = async function (req, res, next) {
    try{        
        return sendResponse(res, 200, 'User profile', req.user)
    }catch(error){
        return errorResponse(res, 400)
    }
};


module.exports.logoutUser = async function (req, res, next) {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlackListTokenModel.create({token});
    res.clearCookie('token');
    return sendResponse(res, 200, 'User Logged out');
};
