const Order = require('../models/order');
const Coffee = require('../models/coffee');

const ErrorHandler = require('../utils/errorHandler');
const catchAyncErrors = require('../middlewares/catchAsyncErrors');

// Create new order => /api/v1/order/new
exports.newOrder = catchAyncErrors( async (req, res, next) => {
    const { 
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})
