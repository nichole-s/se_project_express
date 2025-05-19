const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wtwr_db');

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/signin', login);
app.post('/signup', createUser);

const routes = require('./routes');

app.use(routes);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
