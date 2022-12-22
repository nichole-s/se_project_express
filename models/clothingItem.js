const mongoose = require('mongoose');
const validator = require('validator');

// const userSchema = require('./users');

const clothingItem = new mongoose.Schema({
  name: {
    type: 'string',
    required: 'true',
    minlength: 2,
    maxlength: 30,
  },

  weather: {
    type: 'string',
    required: 'true',
    enum: ['hot', 'warm', 'cold'],
  },

  imageUrl: {
    type: 'string',
    required: 'true',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Link is not valid',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],

  createdAt: {
    type: 'date',
    default: Date.now,
  },
});

module.exports = mongoose.model('clothingItems', clothingItem);
