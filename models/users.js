const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 250,
  },
  lastName: {
    type: String,
    required: true,
    max: 250,
  },
  email: {
    type: String,
    required: true,
    max: 250,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 250,
  },
  age: {
    type: Number,
    required: false,
    default: 0,
  },
}, {timestamps: true, strict: true});

module.exports = mongoose.model('userModel', UserSchema, 'users')
