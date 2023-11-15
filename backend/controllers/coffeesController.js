const Coffee = require('../models/coffee');


//Create New Coffee Product
exports.newCoffee = async (req, res, next) => {

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