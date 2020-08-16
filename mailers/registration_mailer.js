// import nodemailer config
const nodeMailer = require('../config/nodemailer');

// method to take user data and render html mail template and send mail through transporter
// method used to send mail on new user registration
exports.newRegistration = (user) => {
  console.log('inside new Registration mailer', user);
  // render mail html template
  let htmlString = nodeMailer.renderTemplate(
    { user: user },
    '/registration/new_registration.ejs',
  );
  // sending mail
  nodeMailer.transporter.sendMail(
    {
      from: 'your email ID',
      to: user.email,
      subject: 'Account Created !',
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log('error in sending mail', err);
        return;
      }

      console.log('Message sent', info);
      return;
    },
  );
};
