const ERROR_CODES = {
  BadRequest: 400,
  NotFound: 404,
  DefaultError: 500,
};

const handleOnFailError = () => {
  const error = new Error('No item found');
  error.statusCode = 404;
  throw error;
};

const handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    res
      .status(ERROR_CODES.BadRequest)
      .send({ message: 'Bad Request, Invalid input' });

    return;
  }
  if (err.statusCode === 404) {
    res.status(ERROR_CODES.NotFound).send({ message: 'Item not found' });

    return;
  }
  res
    .status(ERROR_CODES.DefaultError)
    .send({ message: 'Something went wrong' });
};

module.exports = {
  ERROR_CODES,
  handleOnFailError,
  handleError,
};
