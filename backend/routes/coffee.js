const express = require('express');
const router = express.Router();


const {getCoffees} = require('../controllers/coffeesController')


router.route('/coffees').get(getCoffees)


module.exports = router;