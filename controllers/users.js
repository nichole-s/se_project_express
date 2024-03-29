const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = require('../utils/config');
const { handleOnFailError, handleError } = require('../utils/errors');

// Create
// const createUser = (req, res) => {
//   const {
//     name, avatar, email, password,
//   } = req.body;
//   User.findOne({ email }).then((user) => {
//     if (user) {
//       const error = new Error('User with this email already exists');
//       error.statusCode = 11000;
//       throw error;
//     }},
//    bcrypt.hash(password, 10)
//     .then(hash => User.create({
//       name, avatar, email, password: hash,
//     })
//     .then((user) => res.send(user)) 
//     .catch((err) => {
//       handleError(err, res);
//     })
//   },

const createUser = (req, res) => {
  const {
    name, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    avatar,
    email,
    password: hash,
  })).then((user) => {
    res.send(user);
  }).catch((err) => {
    // handle the error
    if (err.name === 'MongoServerError') {
      const error = new Error('User with this email already exists');
      error.statusCode = 11000;
      handleError(err, res);
    }
  })
    .then((user) => res.send(user))
    .catch((err) => {
      handleError(err, res);
    });
};

// Read
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      handleError(err, res);
    });
};

const getCurrentUser = (req, res) => {
  const { _id } = req.params;

  User.findById({ _id })
    .orFail(() => {
      handleOnFailError();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      handleError(err, res);
    });
};

const updateUser = (req, res) => {
  const { name, avatar, _id } = req.body;
  User.findByIdAndUpdate(
    { _id },
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      handleOnFailError();
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = {
  createUser,
  getUsers,
  getCurrentUser,
  updateUser,
  login,
};
