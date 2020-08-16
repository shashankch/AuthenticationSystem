// import kue
const kue = require('kue');

// creating queue for executing jobs
const queue = kue.createQueue();

// export the queue
module.exports = queue;
