const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');
const clothingItem = require('./routes/clothingItems');
const users = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/wtwr_db');

const { PORT = 3001 } = process.env;
const app = express();

// const routes = require('./routes');

app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   req.user = {
//     _id: '63a27f7e04a1f23a6e9413df',
//   };
//   next();
// });

// app.use(routes);
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/items', clothingItem);
app.use('/users', users);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
