const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();

require('dotenv').config(); //dotenvを適用して、環境変数の値を取得する

app.use(cors());
app.use(express.json());
app.use(bodyparser.json())

app.get('/', (req, res) => res.send('Hello World!'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

require('./models/user');

const requireToken = require('./middleware/requireToken');
const AuthRoutes = require('./routes/authRoutes');
const BookRoutes = require('./routes/bookRoutes')
app.use(bodyparser.json());
app.use('/user', AuthRoutes);
app.use('/book', BookRoutes);

app.get('/user', requireToken, (req, res) => {
  res.send({email: req.user.email, username: req.user.username})
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`turn on server: http://192.168.0.22:${process.env.PORT || 8000}`);
});
