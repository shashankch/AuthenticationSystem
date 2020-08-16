// import user model
const User = require('../models/user');

// resetPassword token model to map user to access token
const resetPasswordToken = require('../models/resetPasswordToken');

// import bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
// to avoid attack config for bcrypt to set encryption level
const saltRounds = 10;

// to import queue to add jobs
const queue = require('../config/kue');

// to import crypto to generate random string
const crypto = require('crypto');

// import all mailers to send mail on specific actions like password change,new user sign up,forgot pasword link
const registrationMailer = require('../mailers/registration_mailer');
const resetPasswordMailer = require('../mailers/reset_password_mailer');
const updatePasswordMailer = require('../mailers/update_password_mailer');

// import all workers to execute job added in queue
// on specific actions like password change, new user sign up, forgot pasword link
const registrationEmailWorker = require('../workers/registration_email_worker');
const forgotPasswordWorker = require('../workers/forgot_password_worker');
const resetPasswordWorker = require('../workers/reset_password_worker');

// controller action to render profile update page with passing all registered users
// to verify identity of logged in user to update their profile.
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render('user_profile', {
      title: 'User profile',
      profile_user: user,
    });
  });
};

// controller action to update password and username with passwords stored in encrypted format
module.exports.update = async function (req, res) {
  try {
    // to check if password and confirm pass matches
    if (req.user.id == req.params.id) {
      if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Passwords mismatch');
        return res.redirect('back');
      }

      const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds);

      await User.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,

          password: bcryptPassword,
        },
        (err, user) => {
          if (err) {
            console.log(err);
            return res.redirect('back');
          }
          req.flash('success', 'Updated!');
          return res.redirect('back');
        },
      );
    } else {
      req.flash('error', 'Unauthorized!');
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    console.log(err);
    req.flash('error', err);
    return res.redirect('/');
  }
};

// controller action render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up', {
    title: 'Auth| sign up',
  });
};

// contoller action to render sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in', {
    title: 'Auth| sign in',
  });
};

// controller action to create user on sign up if not exists in the db
module.exports.create = async function (req, res) {
  try {
    // to check if password and confirm pass matches
    if (req.body.password != req.body.confirm_password) {
      req.flash('error', 'Passwords mismatch');
      return res.redirect('back');
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds);

      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: bcryptPassword,
        },
        (err, user) => {
          if (err) {
            req.flash('error', err);
            return res.redirect('back');
          }
          // adding job to queue for sending mail on new user registration
          let job = queue.create('emails', user).save(function (err) {
            if (err) {
              console.log('error in creating/sending to a queue');
            }
            console.log('job added to queue', job.id);
            return res.redirect('/users/sign-in');
          });
        },
      );
    } else {
      req.flash('success', 'You already signed up, login to continue!');
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};

// render the home page on successfull sign in with notification
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully !');
  return res.redirect('/');
};

// render the home page on successfull log out of user with notification
module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash('success', 'Logged out Successfully !');
  return res.redirect('/');
};

// render the forgot password page with  email to input
module.exports.forgotPassword = function (req, res) {
  return res.render('forgot_password', {
    title: 'forgot_password',
  });
};

// controller action to search access token when user click on password reset link
// to verify if access token is valid or not or if it is mapped to any user or not to avoid false attempts
module.exports.searchToken = async function (req, res) {
  try {
    // find user with entered email id
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      req.flash('error', 'invalid User! Please try again');
      return res.redirect('back');
    }

    // map unique random token to that user
    resetPasswordToken.create(
      {
        user: user,
        token: crypto.randomBytes(20).toString('hex'),
      },
      (error, resetToken) => {
        if (error) {
          req.flash('error', err);
          return res.redirect('/users/sign-in');
        }
        // adding passwords job to queue to send mail with password reset link
        let job = queue.create('passwords', resetToken).save(function (err) {
          if (err) {
            console.log('error in creating/sending to a queue');
          }
          console.log('job added to queue', job.id);
          req.flash('success', 'Reset Password link sent to email');
          return res.redirect('/users/sign-in');
        });
      },
    );
  } catch (err) {
    req.flash('error', err);
    return res.redirect('/users/sign-in');
  }
};

// controller action to verify the validity of access token and show necessary notification to user
module.exports.resetPassword = function (req, res) {
  // finding reset token from reset password db
  resetPasswordToken.findOne({ token: req.query.accessToken }, function (
    err,
    resetToken,
  ) {
    if (err) {
      console.log('error', err);
      return;
    }
    // if token is invalid then show token expiry message
    if (resetToken.valid === false) {
      req.flash('error', 'token expired!');
      return res.redirect('back');
    }

    // render forgot password page with input password field and passing access token
    return res.render('reset_password', {
      title: 'reset_password',
      resetToken: resetToken,
    });
  });
};

// controller action to update password by finding user from access token and updating its password
// also setting the access token valid to false so it can not be used again
module.exports.validateToken = async function (req, res) {
  try {
    // to check password mismatch
    if (req.body.password != req.body.confirm_password) {
      req.flash('error', 'Passwords mismatch');
      return res.redirect('back');
    }
    // to encrypt password
    const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds);

    // to store update encrypted password in user db
    const user = await User.findByIdAndUpdate(req.params.id, {
      password: bcryptPassword,
    });

    // setting token valid to false
    const resetToken = await resetPasswordToken.findByIdAndUpdate(
      req.params.tokenId,
      { valid: false },
    );

    // adding job in queue to send mail on password change.
    let job = queue.create('updates', user).save(function (err) {
      if (err) {
        console.log('error in creating/sending to a queue');
      }
      console.log('job added to queue', job.id);
      req.flash('success', 'Updated!');
      return res.redirect('/users/sign-in');
    });
  } catch (err) {
    req.flash('error', 'Password Reset Failure!');
    return res.redirect('/users/sign-in');
  }
};
