const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = require('../utils/config');
const { handleOnFailError, handleError } = require('../utils/errors');

// Create
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
  .then((existingUser) => {
    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.statusCode = 11000;
      throw error;
    }

    return bcrypt.hash(password, 10);
  })
  .then((hash) =>
    User.create({
      name,
      avatar,
      email,
      password: hash,
    })
  )
  .then((user) => {
    const userSafe = user.toObject();
    delete userSafe.password;
    res.status(201).send(userSafe);
  })
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
  const { _id } = req.user;

  User.findById(_id)
    .orFail(() => {
      handleOnFailError();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      handleError(err, res);
    });
};

// Update
const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
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
