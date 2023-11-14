const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter coffee name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter coffee price'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter coffee description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this Coffee'],
        enum: {
            values: [
                'Americano',
                'Black Coffee',
                'Cappuccino',
                'Espresso',
                'Latte',
                'Macchiato',
                "Mocha",
                'Cold Brew',
                'Frappuccino',
                'Iced Coffee',
                'Affogato',
                'Mazagran'
            ],
            message: 'Please select correct category for Coffee'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter coffee seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter coffee stock'],
        maxLength: [5, 'Coffee name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            // user: {
            //     type: mongoose.Schema.ObjectId,
            //     ref: 'User',
            //     required: true
            // },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Coffee', coffeeSchema)