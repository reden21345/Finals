const ErrorHandler = require('../utils/errorHandler');



module.exports = (err, req, res, nexy) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    res.status(err.statusCode).json({
        success: false,
        error: err.stack
    })
}