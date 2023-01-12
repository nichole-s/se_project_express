const ClothingItem = require('../models/clothingItem');
const { handleOnFailError, handleError } = require('../utils/errors');

// Create
const createItem = (req, res) => {
  const owner = req.user._id;
  const createdAt = Date.now();
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    imageUrl,
    weather,
    owner,
    createdAt,
  })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

// Read
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ items }))
    .catch((err) => {
      handleError(err, res);
    });
};

// Update

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      handleOnFailError();
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      handleError(err, res);
    });
};

// Delete

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      handleOnFailError();
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      handleError(err, res);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      handleOnFailError();
    })
    // .then(() => res.status(200).send({}))
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return item.remove(() => res.send({ clothingItem: item }));
      }
      return res.status(403).send({
        message: 'You do not have permission to delete another users item',
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
};
