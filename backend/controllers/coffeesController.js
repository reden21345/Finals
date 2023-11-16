const Coffee = require('../models/coffee');


//Create New Coffee Product
exports.createCoffee = async (req, res, next) => {

    const coffee = await Coffee.create(req.body);

    res.status(201).json({
        success: true,
        coffee
    })
}

//Get all Coffees
exports.getCoffees = async (req, res, next) => {


    const coffees = await Coffee.find();

    res.status(200).json({
        success: true,
        count: coffees.length,
        coffees
    });
}

//Get single Coffee Details
exports.getSingleCoffee = async (req, res, next) => {

    const coffee = await Coffee.findById(req.params.id);

    if (!coffee) {
        return res.status(404).json({
            success: false,
            message: "Coffee not found"
        })
    }

    res.status(200).json({
        success: true,
        coffee
    })
}

//Update Coffee Details
exports.updateCoffee = async (req, res, next) => {

    let coffee = await Coffee.findById(req.params.id);

    if (!coffee) {
        return res.status(404).json({
            success: false,
            message: "Coffee not found"
        })
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
}

//Delete Coffee
exports.deleteCoffee = async (req, res, next) => {

    const coffee = await Coffee.findByIdAndDelete(req.params.id);

    if (!coffee) {
        return res.status(404).json({
            success: false,
            message: "Coffee not found"
        })
    };

    res.status(200).json({
        success: true,
        message: "Coffee is deleted."
    })
}