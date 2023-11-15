const express = require('express');
const router = express.Router();


const {getCoffees, newCoffee} = require('../controllers/coffeesController');


router.route('/coffees').get(getCoffees);
router.route('/coffee/new').post(newCoffee);


module.exports = router;