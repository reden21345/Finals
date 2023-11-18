const Coffee = require('../models/coffee');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

//Create New Coffee Product
exports.createCoffee = catchAsyncErrors (async (req, res, next) => {

    const coffee = await Coffee.create(req.body);

    res.status(201).json({
        success: true,
        coffee
    })
})

//Get all Coffees
exports.getCoffees = catchAsyncErrors (async (req, res, next) => {

    const resPerPage = 4;
    const coffeeCount = await Coffee.countDocuments();

    const apiFeatures = new APIFeatures(Coffee.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage);

    const coffees = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: coffees.length,
        coffeeCount,
        coffees
    });
})

//Get single Coffee Details
exports.getSingleCoffee = catchAsyncErrors (async (req, res, next) => {

    const coffee = await Coffee.findById(req.params.id);

    if (!coffee) {
        return next(new ErrorHandler('Coffee not Found', 400));
    }

    res.status(200).json({
        success: true,
        coffee
    })
})

//Update Coffee Details
exports.updateCoffee = catchAsyncErrors (async (req, res, next) => {

    let coffee = await Coffee.findById(req.params.id);

    if (!coffee) {
        return next(new ErrorHandler('Coffee not Found', 400));
    };

    coffee = await Coffee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        coffee
    })
})

//Delete Coffee
exports.deleteCoffee = catchAsyncErrors (async (req, res, next) => {

    const coffee = await Coffee.findByIdAndDelete(req.params.id);

    if (!coffee) {
        return next(new ErrorHandler('Coffee not Found', 400));
    };

    res.status(200).json({
        success: true,
        message: "Coffee is deleted."
    })
})