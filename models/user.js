const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: 'string',
    default: 'Elise Bouer',
    required: 'true',
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: 'string',
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png',
    required: 'true',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Link is not valid',
    },

    email: {
      type: 'string',
      required: 'true',
      unique: 'true',
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Email is not valid',
      },
    },

    password: {
      type: 'string',
      required: 'true',
      minlength: 8,
      select: false,
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('users', userSchema);
