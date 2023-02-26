const express = require("express");
const Call = require("../models/Call");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const calls = await Call.find();
    res.status(200).send(calls);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
