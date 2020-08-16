# AuthenticationSystem

A Complete Authentication System using Node.Js,Express,Passport(Local and Google OAuth2 Strategy),EJS,MongoDB,Redis(queue),Kue(parallel job),Nodemailer(send mail) and Flash,Noty(display messages).

## Functionalities:

#### Sign In Page:

- Add habits with short description.
- display all added habits with related Info.
- displays count of particular habit followed in a week.
- delete particular habit.

#### Sign Up Page:

- display all habits added along with date and month.
- display status of each habits:"None","Not Done","Done" for previous 6 days.
- update status of habits for previous 6 days.

#### Forgot Password Page:

- display all habits added along with date and month.
- display status of each habits:"None","Not Done","Done" for previous 6 days.
- update status of habits for previous 6 days.

#### Profile update Page:

- display all habits added along with date and month.
- display status of each habits:"None","Not Done","Done" for previous 6 days.
- update status of habits for previous 6 days.

#### Reset Password Page:

- display all habits added along with date and month.
- display status of each habits:"None","Not Done","Done" for previous 6 days.
- update status of habits for previous 6 days.

#### Home Page:

- display all habits added along with date and month.
- display status of each habits:"None","Not Done","Done" for previous 6 days.
- update status of habits for previous 6 days.


## Steps to run locally:

```
1. git clone https://github.com/shashankch/HabiDaily.git

2. cd HabiDaily

3. npm install

4. Install MongoDB and run

5. npm start

```

#### Your application should now be running on [localhost:8000](https://github.com/shashankch).


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



