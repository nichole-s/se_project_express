// 9. Handle errors

// If something goes wrong with the request, you'll need to return the corresponding error code:

// 400 — invalid data passed to the methods for creating an item/user or updating an item,
//   or invalid ID passed to the params.

// 404 — there is no user or clothing item with the requested id, or the request was sent to a non-existent address.

// 500 — default error. Accompanied by the message: "An error has occurred on the server."

// When catching an error, check the name of the error using err.name to determine what status and message to send back.
// Each request should have a response in JSON format.
// Moreover, the message field should be sent in case of an error.

// You can do this like so:
// const ERROR_CODE = 400;

// if(err.name === 'SomeErrorName') return res.status(ERROR_CODE).send({ message: "Appropriate error message" })
// For convenience, keep variables with error codes in a separate utils/error.js file,
//   as their list will expand in the future.
// Export the variables and use them in the code when configuring error handling.
// Use the debugger or console.log to see what errors you get.
// Use the orFail() helper
// When attempting to find a record with Mongoose, such as with findOne or findById,
//  if the record is not found, your app should not throw an error.
// Instead, it should simply pass null into your .then handler.

// ClothingItem.findById(id) // some non-existent ID
//   .then((item) => {
//     // incorrectly sends `null` back to the client with a 200 status!
//     res.send(item);
//   })
//   .catch((error) => {
//     // does not run because no error was thrown
//   });

// You could handle this by checking if (item == null) in your .then and throwing an error there.
// But your code will be smoother if the orFail helper is run when no record is found:

// ClothingItem.findById(id)
//   .orFail() // throws a DocumentNotFoundError
//   .then((item) => {
//     res.send(item); // skipped, because an error was thrown
//   })
//   .catch((error) => {
//     // now this does run, so we can handle the error and return an appropriate message
//   });
// You can also pass in a custom function to the orFail method:
// .orFail(() => {
//   const error = new Error("Item ID not found");
//   error.statusCode = 404;
//   throw error; // Remember to throw an error so .catch handles it instead of .then
// })

// ERROR MESSAGE STRUCTURE
// let err = new Error("Object not found"); // create a standard error with the text "Object not found"
// err.name = "NotFoundError"; // change the error name to "NotFoundError"
// console.log(err.name); // make sure the new name is stored inside the error object

// THROW ERROR
// throw new Error("Look out below");

const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

module.exports = ERROR_CODES;
