const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  balance: {
    required: true,
    type: Number,
  }
});

module.exports = mongoose.model('Users', dataSchema);
