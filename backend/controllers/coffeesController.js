const Coffee = require('../models/coffee');
const Order = require('../models/order')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

//Create New Coffee => /api/v1/coffee/new
exports.createCoffee = catchAsyncErrors (async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'coffees'
    });

    imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url
    });
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;

    const coffee = await Coffee.create(req.body);

    res.status(201).json({
        success: true,
        coffee
    })
})

//Get all Coffees => /api/v1/coffees
exports.getCoffees = catchAsyncErrors (async (req, res, next) => {

    const resPerPage = 4;
    const coffeeCount = await Coffee.countDocuments();

    const apiFeatures = new APIFeatures(Coffee.find(), req.query)
        .search()
        .filter()

    apiFeatures.pagination(resPerPage);
    let coffees = await apiFeatures.query;
    let filteredCoffeesCount = coffees.length;

    res.status(200).json({
        success: true,
        coffeeCount,
        resPerPage,
        filteredCoffeesCount,
        coffees
    });
    
})

// Get all coffees (Admin)  =>   /api/v1/admin/coffees
exports.getAdminCoffees = catchAsyncErrors(async (req, res, next) => {

    const coffees = await Coffee.find();

    res.status(200).json({
        success: true,
        coffees
    })

})

//Get single Coffee Details => /api/v1/coffee/:id
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

//Update Coffee Details => /api/v1/admin/coffee/:id
exports.updateCoffee = catchAsyncErrors (async (req, res, next) => {

    let coffee = await Coffee.findById(req.params.id);

    if (!coffee) {
        return next(new ErrorHandler('Coffee not Found', 400));
    };

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the coffee
        for (let i = 0; i < coffee.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(coffee.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'coffees'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }


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

//Delete Coffee => /api/v1/admin/coffee/:id
exports.deleteCoffee = catchAsyncErrors (async (req, res, next) => {

    const coffee = await Coffee.findByIdAndDelete(req.params.id);

    if (!coffee) {
        return next(new ErrorHandler('Coffee not Found', 400));
    };

     // Deleting images associated with the coffee
     for (let i = 0; i < coffee.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(coffee.images[i].public_id)
    }

    res.status(200).json({
        success: true,
        message: "Coffee is deleted."
    })
})


// REVIEWS FUNCTIONS

// Create new preview => /api/v1/review
exports.createCoffeeReview = catchAsyncErrors( async (req, res, next) => {

    const { rating, comment, coffeeId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const coffee = await Coffee.findById(coffeeId);

    const isReviewed = coffee.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
		coffee.reviews.forEach(review => {
			if (review.user.toString() === req.user._id.toString()) {
				review.comment = comment;
				review.rating = rating;
			}
		})
	} else {
		coffee.reviews.push(review);
		coffee.numOfReviews = coffee.reviews.length
	}

    coffee.ratings = coffee.reviews.reduce((acc, item) => item.rating + acc, 0) / coffee.reviews.length

	await coffee.save({ validateBeforeSave: false });

	// if (!coffee)
	// 	return res.status(400).json({
	// 		success: false,
	// 		message: 'review not posted'
	// 	})

	res.status(200).json({
		success: true
	})

}) 

// Get coffee reviews => /api/v1/reviews
exports.getCoffeeReviews = catchAsyncErrors( async (req, res, next) => {
    const coffee = await Coffee.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: coffee.reviews
    })
})

// Delete coffee reviews => /api/v1/reviews
exports.deleteReview = catchAsyncErrors( async (req, res, next) => {
    const coffee = await Coffee.findById(req.query.coffeeId);

    const reviews = coffee.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = coffee.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Coffee.findByIdAndUpdate(req.query.coffeeId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(200).json({
        success: true
    })
})


exports.coffeeSales = async (req, res, next) => {
    const totalSales = await Order.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$itemsPrice" }

            },
            
        },
    ])
    console.log(totalSales)
    const sales = await Order.aggregate([
        { $project: { _id: 0, "orderItems": 1, totalPrice: 1 } },
        { $unwind: "$orderItems" },
        {
            $group: {
                _id: { coffee: "$orderItems.name" },
                total: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } }
            },
        },
    ])
	// return console.log(sales)
    
    if (!totalSales) {
		return res.status(404).json({
			message: 'error sales'
		})
       
    }
    if (!sales) {
		return res.status(404).json({
			message: 'error sales'
		})
      
    }
    
    let totalPercentage = {}
    totalPercentage = sales.map(item => {
         
        // console.log( ((item.total/totalSales[0].total) * 100).toFixed(2))
        percent = Number (((item.total/totalSales[0].total) * 100).toFixed(2))
        total =  {
            name: item._id.coffee,
            percent
        }
        return total
    }) 
    // return console.log(totalPercentage)
    res.status(200).json({
        success: true,
        totalPercentage,
        sales,
        totalSales
    })

}
