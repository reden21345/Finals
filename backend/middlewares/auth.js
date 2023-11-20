const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {

    const { token } = req.cookies
    // const token  = req.header('Authorization').split(' ')[1];

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    
    next()
});