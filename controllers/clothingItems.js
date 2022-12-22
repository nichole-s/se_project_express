// In the body of the POST request for creating a card,
// a user should be able to send an item name, weather type, and image URL.
// They will be passed to the server as a JSON object.
// You will also need a user ID for the owner field.
// Move on to the next step to add a user object to each request.

const ClothingItem = require('../models/clothingItem');

// // Create
const createItem = (req, res) => {
  // console.log(req);
  // console.log(req.body);
  // console.log(req.user._id);
  const owner = req.user._id;
  const createdAt = Date.now();
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner, createdAt })
    .then((item) => {
      // console.log(item);
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: 'Error creating item', e });
    });
};

// // Read
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ items }))
    .catch((e) => {
      res.status(500).send({ message: 'Error finding items', e });
    });
};

// Update
// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { name, weather, imageUrl } = req.body;

//   // console.log(req.params);
//   // console.log(req.body);
//   // console.log(itemId);
//   // console.log(imageUrl);

//   ClothingItem.findByIdAndUpdate(itemId, { $set: { name, weather, imageUrl } })
//     .orFail(() => {
//       const error = new Error('Item ID not found');
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((e) => {
//       res.status(500).send({ message: 'Error updating item', e });
//     });
// };

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error('Item ID not found');
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: 'Error liking item', e });
    });
};

// Delete

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error('Item ID not found');
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: 'Error unliking item', e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  // console.log(itemId);

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error('Item ID not found');
      error.statusCode = 404;
      throw error;
    })
    .then(() => res.status(204).send({}))
    .catch((e) => {
      res.status(500).send({ message: 'Error deleting item', e });
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
};
