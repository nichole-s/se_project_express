// Create three corresponding controllers: getUsers, getUser, and createUser.
// In the body of the POST request for creating a user,
// pass a JSON object with two fields: name and avatar.

const User = require('../models/user');

// // Create
const createUser = (req, res) => {
  // console.log(req);
  // console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((item) => {
      // console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: 'Error creating user', e });
    });
};

// Read
const getUsers = (req, res) => {
  // console.log(req);
  // console.log(req.body);

  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      res.status(500).send({ message: 'Error finding users', e });
    });
};

const getUser = (req, res) => {
  // console.log(req);
  // console.log(req.body);

  const { _id } = req.params;

  // console.log(req.params);
  // console.log(_id);

  User.findById({ _id })
    .orFail(() => {
      const error = new Error('Item ID not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      res.status(500).send({ message: 'Error finding user', e });
    });
};

module.exports = {
  createUser,
  getUser,
  getUsers,
};
