// import passport module
const passport = require('passport');
// import passport oauth1+oauth2 google strategy
const googleStrategy = require('passport-google-oauth');

// import crypto to generate hash string
const crypto = require('crypto');

// import user model
const User = require('../models/user');

// import mailer to send the data to mail template
const registrationMailer = require('../mailers/registration_mailer');

// import queue to add jobs in queue
const queue = require('../config/kue');

// import new registration mail job worker
const registrationEmailWorker = require('../workers/registration_email_worker');

// initialise passport with google oauth strategy with client id,secret to establish identity
passport.use(
  'google',
  new googleStrategy.OAuth2Strategy(
    {
      clientID: 'add client ID generated here',
      clientSecret: 'add client secret generated here',
      callbackURL: 'http://localhost:8000/users/auth/google/callback',
    },
    // callback with user data
    function (accessToken, refreshToken, profile, done) {
      // find user with the given email in db
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user,
      ) {
        if (err) {
          console.log('error in google strategy-passport', err);
          return;
        }
        console.log('#######', accessToken);
        console.log('#######', refreshToken);
        console.log(profile);
        // if user is found return user
        if (user) {
          return done(null, user);
        } else {
          // create user if not exists in db with random/hash password
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex'),
            },
            function (err, user) {
              if (err) {
                console.log(
                  'error in creating user google strategy-passport',
                  err,
                );
                return;
              }
              // adding email job to queue to send mail to user on new registration with our app
              let job = queue.create('emails', user).save(function (err) {
                if (err) {
                  console.log('error in creating/sending to a queue');
                }
                console.log('job added to queue', job.id);
              });
              return done(null, user);
            },
          );
        }
      });
    },
  ),
);

// export the module
module.exports = passport;
