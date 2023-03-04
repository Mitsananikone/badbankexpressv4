async function create(name, email, password, Model) {
    const user = new Model({ name, email, password, balance: 0 });
    const result = await user.save();
    return result;
  }
  
  async function all(Model) {
    const users = await Model.find();
    return users;
  }
  
  async function findOne(email, Model) {
    const user = await Model.findOne({ email });
    return user;
  }
  
  async function update(email, amount, Model) {
    const updatedUser = await Model.findOneAndUpdate(
      { email },
      { $inc: { balance: amount } },
      { new: true }
    );
    return updatedUser;
  }
  
  module.exports = { create, all, findOne, update };
  