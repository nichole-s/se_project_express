const mongoose = require('mongoose');
const validator = require('validator');

const user = new mongoose.Schema({
  name: {
    type: 'string',
    required: 'true',
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: 'string',
    required: 'true',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Link is not valid',
    },
  },
});

module.exports = mongoose.model('users', user);
