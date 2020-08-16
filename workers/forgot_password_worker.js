// import queue
const queue = require('../config/kue');

// import mailer methods to send mail
const resetPasswordMailer = require('../mailers/reset_password_mailer');

// worker checking job type with passwords in queue to start the execution 
// by sending data to particular mailer
queue.process('passwords', function (job, done) {
  console.log('passwords worker is processing a job', job.data);
  // passing job data to mailer to send password reset mail to user
  resetPasswordMailer.newResetPassword(job.data);
  done();
});
