const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    numberOne: {
      type: String,
      required: true,
    },
    numberTwo: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Call", schema);
