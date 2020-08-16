// import express
const express = require('express');

// import express router
const router = express.Router();

// import passport to add authentication middleware
const passport = require('passport');

// import home controller actions
const homeController = require('../controllers/home_controller');

console.log('router is loaded !!');

// adding home route to home action
router.get('/', homeController.home);

// including user routes
router.use('/users', require('./users'));

// export the router
module.exports = router;
