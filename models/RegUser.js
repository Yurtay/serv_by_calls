const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    // refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("RegUser", schema);
