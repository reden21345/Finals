const express = require('express');
const router = express.Router();


const {getCoffees, newCoffee, getSingleCoffee} = require('../controllers/coffeesController');


router.route('/coffees').get(getCoffees);
router.route('/coffee/:id').get(getSingleCoffee);
router.route('/coffee/new').post(newCoffee);


module.exports = router;