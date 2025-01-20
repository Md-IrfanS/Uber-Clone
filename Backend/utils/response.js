
module.exports.sendResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({statusCode, success: true, message, details: data });
};

module.exports.errorResponse = (res, statusCode, message, error) => {
    return res.status(statusCode).json({statusCode, success: false, message, error});
};