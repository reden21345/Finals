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
})


// Handling User roles
exports.authorizeRoles = (...roles) => {
	
    return (req, res, next) => {
        // console.log(roles, req.user, req.body);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message:`Role (${req.user.role}) is not allowed to acccess this resource`})
            // return next(
            //     new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}