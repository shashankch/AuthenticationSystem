// import express
const express = require('express');

// import express router
const router = express.Router();

// import passport for authentication
const passport = require('passport');

// import user controller actions
const usersController = require('../controllers/users_controller');

// route to render logged in user profile
router.get(
  '/profile/:id',
  passport.checkAuthentication,
  usersController.profile,
);

// route to update user profile like password and username
router.post(
  '/update/:id',
  passport.checkAuthentication,
  usersController.update,
);

// route to render forgot password page
router.get('/forgot-password', usersController.forgotPassword);

// route to search for token in db
router.post('/searchToken', usersController.searchToken);

// route to reset password of user through access token
router.get('/reset-password', usersController.resetPassword);

// route to check validity of token
router.post('/validateToken/:id/:tokenId', usersController.validateToken);

// route to render sign in page
router.get('/sign-in', usersController.signIn);

// route to render sign up page
router.get('/sign-up', usersController.signUp);

// route to create user in db
router.post('/create', usersController.create);

// using passport as a middleware to authenticate
// to login user
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/users/sign-in' }),

  usersController.createSession,
);

// to logout user
router.get('/sign-out', usersController.destroySession);

// / used google auth to authenticate user
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

//  and get user details from google api
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/sign-in' }),
  usersController.createSession,
);

// export router
module.exports = router;
