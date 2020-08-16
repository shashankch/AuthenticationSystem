// import nodemailer module
const nodemailer = require('nodemailer');

// import ejs to render
const ejs = require('ejs');

// import path module to set location of templates/workers
const path = require('path');

// creating transporter with service provider and user credentials to send mail
let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your email ID',
    pass: 'your password',
  },
});

// method to render mail template with dynamic data
let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log('error in rendering template');
        return;
      }
      mailHTML = template;
    },
  );
  return mailHTML;
};

// export renderTemplate and transporter
module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
