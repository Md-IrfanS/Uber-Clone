const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');
const BlackListTokenModel = require('../models/blackListToken.model');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req?.headers?.authorization?.split(" ")?.[1];    
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

