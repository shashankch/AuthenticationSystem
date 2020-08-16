// import nodemailer config
const nodeMailer = require('../config/nodemailer');

// method to take user data and render html mail template and send mail through transporter
// method used to send mail on password reset link to user(forgot password)
exports.newResetPassword = (token) => {
  console.log('inside new reset password mailer', token);
  // render mail html template
  let htmlString = nodeMailer.renderTemplate(
    { token: token },
    '/password/new_password_reset.ejs',
  );
  // sending mail
  nodeMailer.transporter.sendMail(
    {
      from: 'your email ID',
      to: token.user.email,
      subject: 'Password Reset !',
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
