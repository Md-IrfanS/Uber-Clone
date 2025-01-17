const UserModel = require('../models/user.model');
const { createUser } = require('../services/user.service');
const { validationResult } = require('express-validator');
const { sendResponse, errorResponse } = require('../utils/response');

module.exports.registerUser = async function(req, res, next){
    try{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return errorResponse(res, 400, 'Fields required', errors.array());
        }

        const { fullName: { firstName, lastName}, email, password } = req.body;

        const hashPassword = await UserModel.hashPassword(password);

        const user = await createUser({firstName, lastName, email, password: hashPassword});

        const token = user.generateAuthToken();

        return sendResponse(res, 201, 'Registered user', {token, user});

    }catch(error){
        return errorResponse(res, 400, 'failed to create user', error);
    }
};


