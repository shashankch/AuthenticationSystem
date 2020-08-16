// import mongoose odm module
const mongoose = require('mongoose');

// creating the user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
// creating model from schema
const User = mongoose.model('User', userSchema);

// export the model
module.exports = User;
