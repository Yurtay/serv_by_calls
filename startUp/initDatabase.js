const callMock = require("../mock/calls.json");
const userMock = require("../mock/users.json");
const Call = require("../models/Call.js");
const User = require("../models/User.js");

module.exports = async () => {
  const calls = await Call.find();
  if (calls.length !== callMock.length) {
    await createInitialEntity(Call, callMock);
  }
  const users = await User.find();
  if (users.length !== userMock.length) {
    await createInitialEntity(User, userMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
