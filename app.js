const express = require('express');

const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/wtwr_db',
  (r) => {
    console.log('connected to DB', r);
  },
  (e) => console.log('DB error', e)
);

const { PORT = 3001 } = process.env;
const app = express();

const routes = require('./routes');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63a27f7e04a1f23a6e9413df',
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log('still working correctly...');
});
