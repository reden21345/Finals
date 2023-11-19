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

     const token = user.getJwtToken();

      res.status(201).json({
      	success:true,
      	user,
     	token
      })

    // res.status(201).json({
    //     success: true,
    //     user
    // })
})


// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors( async (req, res, next) => {
    const {email, password} = req.body;

        // Validation
        if (!email || !password) {
            return next(new ErrorHandler('Please enter email and password', 400));
        }

        // Finding User in database
        const user = await User.findOne({email}).select('+password');

        if (!user) {
            return next(new ErrorHandler('Invalid email or password', 401));
        }

        // Checks if password is correct or not
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler('Invalid email or password', 401));
        }

        const token = user.getJwtToken();

        res.status(200).json({
            success: true,
            token
        })
})