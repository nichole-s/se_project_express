const mongoose = require('mongoose');
const validator = require('validator');

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
    enum: ['hot', 'warm', 'cold', 'sunny'],
  },

  imageUrl: {
    type: 'string',
    required: 'true',
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
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
