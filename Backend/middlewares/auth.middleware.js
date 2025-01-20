const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');
const BlackListTokenModel = require('../models/blackListToken.model');
const CaptainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")?.[1] || req.cookies.token;    
    if (!token) {
        return errorResponse(res, 401, 'Unauthorized');
    }

    const isBlackListed = await BlackListTokenModel.findOne({token});
    
    if (isBlackListed) {
        return errorResponse(res, 401, 'Unauthorized');
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);
        req.user = user;
        return next();
    }catch(error){
        return errorResponse(res, 401, 'Unauthorized');
    }
};

module.exports.authCaptain = async (req, res, next) => {    
    const token = req.headers.authorization.split(' ')[1] || req.cookies.token;
    if (!token) {
        return errorResponse(res, 401, 'Unauthorized');
    }

    const isBlackListed = await BlackListTokenModel.findOne({token});
    
    if (isBlackListed) {
        return errorResponse(res, 401, 'Unauthorized');
    }

    try{
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const captain = await CaptainModel.findById(decoded._id);
       req.captain = captain;
       return next();
    }catch(error){
        return errorResponse(res, 401, 'Unauthorized');
    }
};

