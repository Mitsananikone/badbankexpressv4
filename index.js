require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const router = require('./routes/routes');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const database = mongoose.connection;
database.on('error', (error) => console.log(error));
database.once('connected', () => console.log('Database connected'));

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
