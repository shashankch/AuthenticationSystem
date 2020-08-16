// import mongoose odm module
const mongoose = require('mongoose');

// creating the reset passwordToken schema
const resetPasswordTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    token: {
      type: String,
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
// creating model from schema
// model is used to map users with randomly generated access token to reset password on users request.
const resetPasswordToken = mongoose.model(
  'resetPasswordToken',
  resetPasswordTokenSchema,
);

// export the model
module.exports = resetPasswordToken;
