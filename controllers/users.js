const User = require('../models/user');
const { handleOnFailError, handleError } = require('../utils/errors');

// Create
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((item) => {
      res.send({ data: item });
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

const getUser = (req, res) => {
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

module.exports = {
  createUser,
  getUser,
  getUsers,
};
