const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

require('dotenv').config(); //dotenvを適用して、環境変数の値を取得する

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

require('./models/user');

const AuthRoutes = require('./routes/authRoutes');
const BookRoutes = require('./routes/bookRoutes');
app.use('/user', AuthRoutes);
app.use('/book', BookRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(
    `turn on server: http://192.168.0.22:${process.env.PORT || 8000}`
  );
});
