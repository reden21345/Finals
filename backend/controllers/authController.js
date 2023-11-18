const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors( async (req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatar/sheesh_syuzzi',
            url: 'https://res.cloudinary.com/dkhhpo8zw/image/upload/v1700305546/avatar/sheesh_syuzzi.jpg'
        }
    })

    res.status(201).json|({
        success: true,
        user
    })
})
