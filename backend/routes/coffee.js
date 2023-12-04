const express = require('express');
const router = express.Router();

const {
    getCoffees, 
    createCoffee, 
    getSingleCoffee, 
    updateCoffee,
    deleteCoffee,
    createCoffeeReview,
    getCoffeeReviews,
    deleteReview,
    getAdminCoffees
} = require('../controllers/coffeesController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/coffees').get(getCoffees);
router.route('/coffee/:id').get(getSingleCoffee);

router.route('/admin/coffees').get(getAdminCoffees);
router.route('/admin/coffee/new').post(isAuthenticatedUser, authorizeRoles('admin'), createCoffee);

router.route('/admin/coffee/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateCoffee)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCoffee);

router.route('/review').put(isAuthenticatedUser, createCoffeeReview);
router.route('/reviews').get(isAuthenticatedUser, getCoffeeReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;