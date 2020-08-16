// import queue
const queue = require('../config/kue');

// import mailer to send mail on new user sign up
const registrationMailer = require('../mailers/registration_mailer');

// worker to process job type: emails by passing to mailer methods
queue.process('emails', function (job, done) {
  console.log('emails worker is processing a job', job.data);
    registrationMailer.newRegistration(job.data);
    done();
});
