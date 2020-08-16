// import nodemailer config
const nodeMailer = require('../config/nodemailer');

// method to take user data and render html mail template and send mail through transporter
// method used to send mail on password change to user.
exports.newUpdatePassword = (user) => {
  console.log('inside new updates password mailer', user);
  // render mail html template
  let htmlString = nodeMailer.renderTemplate(
    { user: user },
    '/password/new_updatePassword.ejs',
  );
  // sending mail
  nodeMailer.transporter.sendMail(
    {
      from: 'your email ID',
      to: user.email,
      subject: 'Security Alert!',
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
