# AuthenticationSystem

A Complete Authentication System using Node.Js, Express, Passport (Local and Google OAuth2 Strategy) , EJS,MongoDB, Redis (queue), Kue (parallel job), Nodemailer (send mail) and Flash,Noty (display messages).

It allows users to quickly integrate authentication system in their application.

## Functionalities:

#### Sign In Page:

- Allows user to log in with registered email and password.
- Forgot Password Option ( to get reset password link on registered user emailID).
- Social Authentication (Option to Login using Google user account).
- Creates user on valid google sign in if not already registered.
- Displays all necessary notifications to user.

#### Sign Up Page:

- Allows user to register using name,emailID and password.
- Allows user to sign up using verified google account.
- Displays all necessary notifications to user.

#### Forgot Password Page:

- Allows user to send reset Password Link to valid registered emailID
- Generates OneTime-use accessToken for the registered emailID requested for password Reset and send link to user's mail. 
- Displays all necessary notifications to user.

#### Profile update Page:

- displays Info like username,emailID,password to loggedIn user
- Option to reset password and username.
- Displays all necessary notifications to user on password mismatch,wrong entries etc.

#### Reset Password Page:

- Accessible using password Reset Link sent to registered emailID.
- Allows user to enter new password to update
- Verifies user using accessToken generated.
- Displays all necessary notifications to user on password mismatch,wrong entries etc.

#### Home Page:

- display all habits added along with date and month.
- display status of each habits:"None","Not Done","Done" for previous 6 days.
- update status of habits for previous 6 days.


## Steps to run locally:

```
1. git clone https://github.com/shashankch/AuthenticationSystem.git

2. cd AuthenticationSystem

3. npm install

4. Install MongoDB,Redis and run

5. npm start

```

#### Your application should now be running on [localhost:8000](https://github.com/shashankch/AuthenticationSystem).

#### To check Kue-Dashboard to check parallel jobs running on [localhost:3000](https://github.com/shashankch/AuthenticationSystem). Type on CLI: ./node_modules/kue/bin/kue-dashboard


## Project Structure:

```
.
├── README.md
├── assets
│   ├── css
│   │   ├── card.css
│   │   ├── header.css
│   │   └── layout.css
│   ├── js
│   └── scss
├── config
│   ├── kue.js
│   ├── middleware.js
│   ├── mongoose.js
│   ├── nodemailer.js
│   ├── passport-google-oauth2-strategy.js
│   └── passport-local-strategy.js
├── controllers
│   ├── home_controller.js
│   └── users_controller.js
├── index.js
├── mailers
│   ├── registration_mailer.js
│   ├── reset_password_mailer.js
│   └── update_password_mailer.js
├── models
│   ├── resetPasswordToken.js
│   └── user.js
├── package-lock.json
├── package.json
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── _footer.ejs
│   ├── _header.ejs
│   ├── forgot_password.ejs
│   ├── home.ejs
│   ├── layout.ejs
│   ├── mailers
│   │   ├── password
│   │   │   ├── new_password_reset.ejs
│   │   │   └── new_updatePassword.ejs
│   │   └── registration
│   │       └── new_registration.ejs
│   ├── reset_password.ejs
│   ├── user_profile.ejs
│   ├── user_sign_in.ejs
│   └── user_sign_up.ejs
└── workers
    ├── forgot_password_worker.js
    ├── registration_email_worker.js
    └── reset_password_worker.js

```
## Next Steps:

- add google RecaptchaV3 in my Authentication System.

## Contributing:

- All contributions are welcome!
