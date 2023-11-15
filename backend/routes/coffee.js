const express = require('express');
const router = express.Router();


const {getCoffees, newCoffee, getSingleCoffee, updateCoffee} = require('../controllers/coffeesController');


router.route('/coffees').get(getCoffees);
router.route('/coffee/:id').get(getSingleCoffee);

router.route('/coffee/new').post(newCoffee);

router.route('/admin/coffee/:id').put(updateCoffee);


module.exports = router;