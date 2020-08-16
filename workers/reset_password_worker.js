// import queue
const queue = require('../config/kue');
// import update password mailer to send mail on password change
const updatePasswordMailer = require('../mailers/update_password_mailer');

// worker to process job type: updates and passing data to mailer methods.
queue.process('updates', function (job, done) {
  console.log('updates worker is processing a job', job.data);
  updatePasswordMailer.newUpdatePassword(job.data);
  done();
});
