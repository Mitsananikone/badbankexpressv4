require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;
database.on('error', (error) => console.log(error));
database.once('connected', () => console.log('Database connected'));

app.use(express.json());

const routes = require('./routes/routes');
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
