const mongoose = require('mongoose');
const User = require('./model/model');
let db = null;

// connect to mongo
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});

const database = mongoose.connection;
database.on('error', (error) => console.log(error));
database.once('connected', () => {
  db = database.db;
  console.log('Database connected');
});


async function create(name, email, password, Model) {
  const user = new Model({ name, email, password, balance: 0 });
  const result = await user.save();
  return result;
}

async function all() {
  const users = await User.find();
  return users;
}

async function findOne(email) {
  const user = await User.findOne({ email });
  return user;
}

async function update(email, amount) {
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $inc: { balance: amount } },
    { new: true }
  );
  return updatedUser;
}

module.exports = { create, all, findOne, update, db };
