const express = require('express');
const router = express.Router();


const {
    getCoffees, 
    createCoffee, 
    getSingleCoffee, 
    updateCoffee,
    deleteCoffee
} = require('../controllers/coffeesController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/coffees').get(getCoffees);
router.route('/coffee/:id').get(getSingleCoffee);

router.route('/coffee/new').post(isAuthenticatedUser, createCoffee);

router.route('/admin/coffee/:id')
    .put(isAuthenticatedUser, updateCoffee)
    .delete(isAuthenticatedUser, deleteCoffee);



module.exports = router;