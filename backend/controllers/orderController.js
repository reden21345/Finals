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

// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAyncErrors( async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        count: orders.length,
        orders
    })
})

// Get all orders   =>   /api/v1/admin/orders
exports.allOrders = catchAyncErrors( async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Update / Process order -ADMIN =>   /api/v1/admin/order/:id
exports.updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    // console.log(req.body.order)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.coffee, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()
    
    await order.save()
    res.status(200).json({
        success: true,
    })
}

async function updateStock(id, quantity) {
    const coffee = await Coffee.findById(id);

    coffee.stock = coffee.stock - quantity;

    await coffee.save({ validateBeforeSave: false })
}

// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAyncErrors( async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    
    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404));
    }

    // await order.deleteOne()

    res.status(200).json({
        success: true,
    })
})