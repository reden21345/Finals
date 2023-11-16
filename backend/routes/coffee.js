const express = require('express');
const router = express.Router();


const {
    getCoffees, 
    createCoffee, 
    getSingleCoffee, 
    updateCoffee,
    deleteCoffee
} = require('../controllers/coffeesController');


router.route('/coffees').get(getCoffees);
router.route('/coffee/:id').get(getSingleCoffee);

router.route('/coffee/new').post(createCoffee);

router.route('/admin/coffee/:id').put(updateCoffee).delete(deleteCoffee);



module.exports = router;