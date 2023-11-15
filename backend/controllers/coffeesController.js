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
exports.getCoffees = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "This route will show all Coffees in the database."
    })
}